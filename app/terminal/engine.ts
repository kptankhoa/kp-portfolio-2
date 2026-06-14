import { PortfolioItem } from '../data/types';
import { summaryData } from '../data/summary';

export interface CommandResult {
  output: string[];
  newCwd?: string[];
  navigateTo?: string;   // finder path to navigate to ('' = root)
  openUrl?: string;      // external URL to open in a new tab
  closeTerminal?: boolean;
  clear?: boolean;
}

const HELP = [
  'kpsh — available commands:',
  '  ls [dir]       list directory contents',
  '  cd <dir>       change directory (moves the finder too)',
  '  pwd            print working directory',
  '  cat <file>     print file contents',
  '  open <item>    open in finder; also: resume, github, linkedin, email, telegram',
  '  whoami         who am I?',
  '  neofetch       system info',
  '  clear          clear the screen',
  '  exit           close the terminal',
];

const COMMANDS = ['help', 'ls', 'cd', 'pwd', 'cat', 'open', 'whoami', 'neofetch', 'clear', 'exit'];
const PATH_COMMANDS = ['ls', 'cd', 'cat', 'open'];
const OPEN_SHORTCUTS = ['resume', 'github', 'linkedin', 'telegram', 'whatsapp', 'email'];

const NEOFETCH = [
  ' ██╗  ██╗██████╗       guest@kpos',
  ' ██║ ██╔╝██╔══██╗      ──────────',
  ' █████╔╝ ██████╔╝      OS: kpOS 1.0 (Gruvbox Dark)',
  ' ██╔═██╗ ██╔═══╝       Shell: kpsh',
  ' ██║  ██╗██║           Font: Cutive Mono',
  ' ╚═╝  ╚═╝╚═╝           Stack: Next.js · React · TypeScript',
  '                       Host: Cloudflare',
];

function nodeAt(path: string[], data: PortfolioItem[]): PortfolioItem | null {
  let items = data;
  let node: PortfolioItem | null = null;
  for (const id of path) {
    node = items.find((i) => i.id === id) ?? null;
    if (!node) {
      return null;
    }
    items = node.children ?? [];
  }

  return node;
}

function childrenAt(path: string[], data: PortfolioItem[]): PortfolioItem[] | null {
  if (path.length === 0) {
    return data;
  }

  return nodeAt(path, data)?.children ?? null;
}

// Resolve a target like '..', '~/projects', 'projects/codelink', 'bio.txt'
// against cwd. Segments match item ids or display names, case-insensitively.
function resolve(
  cwd: string[],
  target: string,
  data: PortfolioItem[],
): { path: string[] } | { error: string } {
  let path = [...cwd];
  let rest = target;
  if (rest === '~' || rest.startsWith('~/')) {
    path = [];
    rest = rest.slice(1);
  }
  for (const seg of rest.split('/').filter(Boolean)) {
    if (seg === '.') {
      continue;
    }
    if (seg === '..') {
      path.pop();
      continue;
    }
    const items = childrenAt(path, data);
    const t = seg.toLowerCase();
    const child = items?.find(
      (i) => i.id.toLowerCase() === t || i.name.toLowerCase() === t,
    );
    if (!child) {
      return { error: `${seg}: no such file or directory` };
    }
    path = [...path, child.id];
  }

  return { path };
}

export function runCommand(
  rawInput: string,
  cwd: string[],
  data: PortfolioItem[],
): CommandResult {
  const input = rawInput.trim();
  if (!input) {
    return { output: [] };
  }
  const [cmd, ...rest] = input.split(/\s+/);
  const arg = rest.join(' ');

  switch (cmd) {
  case 'help':
    return { output: HELP };
  case 'clear':
    return { output: [], clear: true };
  case 'exit':
    return { output: ['logout'], closeTerminal: true };
  case 'pwd':
    return { output: [`~${cwd.length ? '/' + cwd.join('/') : ''}`] };
  case 'whoami':
    return {
      output: [
        `${summaryData.firstName} ${summaryData.lastName} — ${summaryData.label}`,
        summaryData.email,
      ],
    };
  case 'neofetch':
    return { output: NEOFETCH };
  case 'ls': {
    const res = arg ? resolve(cwd, arg, data) : { path: cwd };
    if ('error' in res) {
      return { output: [`ls: ${res.error}`] };
    }
    const items = childrenAt(res.path, data);
    if (!items) {
      return { output: [`ls: ${arg}: not a directory`] };
    }

    return { output: items.map((i) => (i.children?.length ? `${i.name}/` : i.name)) };
  }
  case 'cd': {
    if (!arg || arg === '~') {
      return { output: [], newCwd: [], navigateTo: '' };
    }
    const res = resolve(cwd, arg, data);
    if ('error' in res) {
      return { output: [`cd: ${res.error}`] };
    }
    // A folder is identified by having a children array (even if empty),
    // not by being non-empty — so an empty folder is still a valid cd target.
    if (res.path.length > 0 && !nodeAt(res.path, data)?.children) {
      return { output: [`cd: ${arg}: not a directory`] };
    }

    return { output: [], newCwd: res.path, navigateTo: res.path.join('/') };
  }
  case 'cat': {
    if (!arg) {
      return { output: ['usage: cat <file>'] };
    }
    const res = resolve(cwd, arg, data);
    if ('error' in res) {
      return { output: [`cat: ${res.error}`] };
    }
    const node = nodeAt(res.path, data);
    if (!node?.content) {
      return { output: [`cat: ${arg}: is a directory`] };
    }
    const c = node.content;
    const lines: string[] = [c.title ?? node.name];
    if (c.subtitle) {
      lines.push(c.subtitle);
    }
    if (c.description) {
      lines.push('', ...c.description.split('\n'));
    }
    for (const sec of c.tagSections ?? []) {
      lines.push('', `${sec.title}: ${sec.tags.join(', ')}`);
    }
    for (const l of c.links ?? []) {
      lines.push(`${l.label}: ${l.url}`);
    }

    return { output: lines };
  }
  case 'open': {
    if (!arg) {
      return { output: ['usage: open <item>'] };
    }
    const key = arg.toLowerCase();
    const shortcuts: Record<string, string> = {
      resume: summaryData.resumeFileUrl,
      github: summaryData.socialLinks.github,
      linkedin: summaryData.socialLinks.linkedin,
      telegram: summaryData.socialLinks.telegram,
      whatsapp: summaryData.socialLinks.whatsapp,
      email: `mailto:${summaryData.email}`,
    };
    if (shortcuts[key]) {
      return { output: [`opening ${key}...`], openUrl: shortcuts[key] };
    }
    if (key === 'terminal' || key === 'terminal.app') {
      return { output: ['already here :)'] };
    }
    const res = resolve(cwd, arg, data);
    if ('error' in res) {
      return { output: [`open: ${res.error}`] };
    }

    return {
      output: [`opening ~/${res.path.join('/')}...`],
      navigateTo: res.path.join('/'),
    };
  }
  default:
    return {
      output: [
        `kpsh: command not found: ${cmd}`,
        'type \'help\' for available commands',
      ],
    };
  }
}

export interface CompletionResult {
  input: string;          // the (possibly extended) input line
  suggestions?: string[]; // candidate list to print when ambiguous
}

// Longest common prefix of a list of strings, matched case-insensitively but
// returning the casing of the first candidate.
function commonPrefix(strs: string[]): string {
  if (strs.length === 0) {
    return '';
  }
  let prefix = strs[0];
  for (const s of strs.slice(1)) {
    while (prefix && !s.toLowerCase().startsWith(prefix.toLowerCase())) {
      prefix = prefix.slice(0, -1);
    }
  }

  return prefix;
}

// Tab-completion: completes the command word (when no space typed yet) or the
// last path segment of a path-taking command's argument. Returns the new input
// line, plus a suggestion list when the choice is ambiguous and can't advance.
export function complete(
  rawInput: string,
  cwd: string[],
  data: PortfolioItem[],
): CompletionResult {
  const firstSpace = rawInput.indexOf(' ');

  // Completing the command name.
  if (firstSpace === -1) {
    const matches = COMMANDS.filter((c) => c.startsWith(rawInput.toLowerCase()));
    if (matches.length === 0) {
      return { input: rawInput };
    }
    if (matches.length === 1) {
      return { input: `${matches[0]} ` };
    }
    const prefix = commonPrefix(matches);
    if (prefix.length > rawInput.length) {
      return { input: prefix };
    }

    return { input: rawInput, suggestions: [matches.join('  ')] };
  }

  // Completing a path argument.
  const cmd = rawInput.slice(0, firstSpace);
  const argStr = rawInput.slice(firstSpace + 1);
  if (!PATH_COMMANDS.includes(cmd)) {
    return { input: rawInput };
  }

  const lastSlash = argStr.lastIndexOf('/');
  const basePath = lastSlash === -1 ? '' : argStr.slice(0, lastSlash + 1);
  const fragment = lastSlash === -1 ? argStr : argStr.slice(lastSlash + 1);

  const baseTarget = basePath.replace(/\/$/, '');
  const res = baseTarget ? resolve(cwd, baseTarget, data) : { path: cwd };
  if ('error' in res) {
    return { input: rawInput };
  }

  const items = childrenAt(res.path, data) ?? [];
  const named = items.map((item) => ({
    label: item.name,
    isDir: !!item.children?.length,
  }));
  if (cmd === 'open' && !basePath) {
    OPEN_SHORTCUTS.forEach((label) => named.push({ label, isDir: false }));
  }

  const fragLower = fragment.toLowerCase();
  const matches = named.filter((n) => n.label.toLowerCase().startsWith(fragLower));
  if (matches.length === 0) {
    return { input: rawInput };
  }

  const prefix = `${cmd} ${basePath}`;
  if (matches.length === 1) {
    return { input: `${prefix}${matches[0].label}${matches[0].isDir ? '/' : ' '}` };
  }

  const labels = matches.map((m) => m.label);
  const lcp = commonPrefix(labels);
  if (lcp.length > fragment.length) {
    return { input: `${prefix}${lcp}` };
  }

  return {
    input: rawInput,
    suggestions: [matches.map((m) => (m.isDir ? `${m.label}/` : m.label)).join('  ')],
  };
}
