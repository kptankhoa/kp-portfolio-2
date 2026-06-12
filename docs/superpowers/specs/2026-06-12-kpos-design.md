# kpOS — Deepening the OS Metaphor

**Date:** 2026-06-12
**Status:** Approved

## Goal

Evolve the Finder-style portfolio into a fuller "kpOS" experience: a menu bar
with a live clock, real window chrome with traffic lights, and a working
terminal easter egg — while keeping the site fully mobile-friendly and
shipping a set of code-health fixes alongside.

Explicitly out of scope (considered and rejected): a dock, light/dark theme
toggle, broader motion/animation polish.

## Constraints

- Mobile-friendly is a hard requirement. Mobile gets a "phone OS" treatment,
  not a scaled-down desktop.
- Keep existing conventions: styled-jsx components, CSS variables with the
  Gruvbox dark palette, Cutive Mono, static export (`output: 'export'`)
  deployed via Wrangler.
- No new runtime dependencies. The work removes dependencies (MUI, Emotion),
  it does not add any.

## 1. Menu bar (desktop) / status bar (mobile)

A new `MenuBar` component rendered above the main window, outside it.

**Desktop (>768px):**
- Left: KP rune image + `Khoa Phan` name (moved here from the in-window header).
- Right: `>_` terminal toggle button, then a live clock formatted like
  `Thu 12 Jun 14:32`, updated every minute (interval cleaned up on unmount).
- Thin bar, `--bg-secondary`-style background with bottom border, fixed at the
  top of the viewport.

**Mobile (≤768px):**
- Slims to a phone status bar: logo left; `>_` and clock (time only, `14:32`)
  right.

The existing in-window `Header` loses its logo row and keeps only the
breadcrumbs, which remain the clickable navigation. Breadcrumb behavior is
unchanged.

## 2. Window chrome

A new `TitleBar` component at the top of the main window, desktop and tablet
only (hidden ≤768px — on mobile the app is the screen, no chrome).

- Traffic lights (red, yellow, green dots) on the left.
- Window title centered/left-aligned after the lights:
  `KhoaPhan — ~/<path>` where the path derives from the current selections
  (same source as breadcrumbs), e.g. `KhoaPhan — ~/projects/codelink`.
- Traffic light behaviors:
  - **Green:** toggles fullscreen — the window expands to fill the viewport
    (wrapper padding/max-width removed) and back.
  - **Yellow:** plays a brief wiggle/minimize CSS animation; no state change.
  - **Red:** shows a small transient tooltip ("nice try :)").

## 3. Terminal

A working fake shell over the real portfolio data.

**Entry points:**
- A `terminal.app` item (type `app`) at the finder root in `portfolioData`.
  Selecting it opens the terminal window (it does not render a preview).
- The `>_` button in the menu bar / mobile status bar.

**Presentation:**
- Desktop: floating window (~600×420 default) layered above the finder,
  draggable by its title bar, with its own traffic lights — red closes,
  yellow wiggles, green maximizes the terminal within the viewport.
- Mobile: fullscreen overlay with a close button.
- Monospace already site-wide; terminal uses the Gruvbox palette (green
  prompt, red errors).

**Commands:**

| Command | Behavior |
|---|---|
| `help` | List commands |
| `ls` | List children of the terminal cwd in the portfolio tree |
| `cd <dir>` | Change cwd; also drives the real finder navigation behind the window |
| `pwd` | Print cwd path |
| `cat <file>` | Print the item's content (title, description, tags) as text |
| `open <item>` | Open item in finder; `open resume`/`github`/`linkedin`/`email` open the external links from `summaryData` |
| `whoami` | Print name, label, email from `summaryData` |
| `clear` | Clear the screen |
| `neofetch` | ASCII KP rune + site stats (stack, theme, font, uptime joke) |

- Command history via ↑/↓.
- Unknown command → `command not found: <x>`; `cd` into a non-folder or
  missing path → error message, mirroring real shell behavior.

**State/architecture:** navigation state currently lives in
`useFinderNavigation` inside `HomeContent`. It lifts into a `FinderProvider`
context exposing the navigation API (selections, columns, select/open
handlers). Both the finder UI and the terminal consume it, so terminal
commands move the real UI. Terminal open/closed state lives in the same
provider (menu bar, finder item, and terminal window all touch it).

## 4. Retro cursor

The pointer itself goes retro, matching the classic-OS concept.

- **Site-wide pixel cursors:** custom CSS cursors (`cursor: url(...)`) drawn
  as pixel-art in the classic System-7 style — black arrow with white
  outline, crisp/aliased. Two variants: default arrow, and a pointing-hand
  for clickable elements (finder items, breadcrumbs, buttons, links).
  Shipped as small static assets in `public/` with sensible fallbacks
  (`cursor: url(...) x y, auto` / `, pointer`).
- **Terminal caret:** the terminal input uses a blinking block cursor (█)
  instead of the native caret, like a real vintage shell.
- Touch devices are unaffected (no cursor), so mobile needs no special
  handling.

## 5. Code health (shipped alongside)

- **Build script:** `next build && next export` → `next build`. `next export`
  no longer exists in Next 16; the config already has `output: 'export'`.
- **Drop MUI/Emotion:** `@mui/material`, `@mui/icons-material`,
  `@emotion/react`, `@emotion/styled` are used only for ~10 icons. Replace
  with small inline SVG components in `app/components/icons` (same names/API
  where practical), then remove the four dependencies.
- **Noise texture:** the body grain overlay hotlinks
  `grainy-gradients.vercel.app/noise.svg`. Inline the equivalent SVG
  (`feTurbulence`) as a data URI in `globals.css`.
- **Metadata:** fix "Porfolio" typo; add proper description, `metadataBase`,
  and OpenGraph title/description alongside the existing image.
- **README:** replace the create-next-app boilerplate with a short real one
  (what the site is, dev/build commands, deploy notes).
- **Public cleanup:** delete unused template SVGs (`file.svg`, `vercel.svg`,
  `next.svg`, `globe.svg`, `window.svg`) after confirming nothing references
  them.

## Responsive summary

| Breakpoint | Menu bar | Window chrome | Terminal |
|---|---|---|---|
| >1024px | Full menu bar + clock | Floating window, title bar, traffic lights | Draggable floating window |
| 769–1024px | Full menu bar + clock | Fullscreen window, title bar kept | Floating window |
| ≤768px | Phone status bar (logo, `>_`, time) | None — app fills screen | Fullscreen overlay |

## Verification

No test infrastructure exists and none is added. Each step verifies with
`npm run lint`, `npm run build` (static export must succeed), and manual
checks in the browser at desktop and mobile widths.
