'use client';

import { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data';
import { useFinder } from '../context/FinderContext';
import { runCommand, complete } from '../terminal/engine';
import { useIsMobile } from '../hooks';

interface TermLine {
  text: string;
  kind: 'input' | 'output';
}

const WELCOME: TermLine[] = [
  { text: 'kpOS 1.0 (Gruvbox Dark) — kpsh', kind: 'output' },
  { text: 'type \'help\' to get started', kind: 'output' },
];

export function TerminalWindow() {
  const { terminalOpen, closeTerminal, navigateToPath } = useFinder();
  const isMobile = useIsMobile();
  const [lines, setLines] = useState<TermLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [maximized, setMaximized] = useState(false);
  const [wiggle, setWiggle] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ w: 600, h: 420 });
  const drag = useRef<{ startX: number; startY: number; baseX: number; baseY: number } | null>(null);
  const resize = useRef<{
    startX: number;
    startY: number;
    baseW: number;
    baseH: number;
    basePosX: number;
    basePosY: number;
  } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalOpen) {
      inputRef.current?.focus();
    }
  }, [terminalOpen]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [lines, terminalOpen]);

  if (!terminalOpen) {
    return null;
  }

  const prompt = `guest@kpos ~${cwd.length ? '/' + cwd.join('/') : ''} $`;

  const floating = !isMobile && !maximized;

  // Reset window chrome so the terminal always reopens centered and restored.
  // The command session (lines, cwd, history) is intentionally preserved.
  const handleClose = () => {
    setMaximized(false);
    setPos({ x: 0, y: 0 });
    setSize({ w: 600, h: 420 });
    closeTerminal();
  };

  const submit = () => {
    const result = runCommand(input, cwd, portfolioData);
    const echoed: TermLine = { text: `${prompt} ${input}`, kind: 'input' };
    if (input.trim()) {
      setHistory((h) => [...h, input]);
    }
    setHistoryIndex(-1);
    setInput('');
    if (result.clear) {
      setLines([]);

      return;
    }
    setLines((prev) => [
      ...prev,
      echoed,
      ...result.output.map((text) => ({ text, kind: 'output' as const })),
    ]);
    if (result.newCwd) {
      setCwd(result.newCwd);
    }
    if (result.navigateTo !== undefined) {
      navigateToPath(result.navigateTo);
    }
    if (result.openUrl) {
      window.open(result.openUrl, '_blank', 'noopener,noreferrer');
    }
    if (result.closeTerminal) {
      handleClose();
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) {
        return;
      }
      const idx = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(idx);
      setInput(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) {
        return;
      }
      const idx = historyIndex + 1;
      if (idx >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(idx);
        setInput(history[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const result = complete(input, cwd, portfolioData);
      if (result.suggestions) {
        setLines((prev) => [
          ...prev,
          { text: `${prompt} ${input}`, kind: 'input' },
          ...result.suggestions!.map((text) => ({ text, kind: 'output' as const })),
        ]);
      }
      setInput(result.input);
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!floating) {
      return;
    }
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, startY: e.clientY, baseX: pos.x, baseY: pos.y };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) {
      return;
    }
    setPos({
      x: drag.current.baseX + e.clientX - drag.current.startX,
      y: drag.current.baseY + e.clientY - drag.current.startY,
    });
  };

  const onPointerUp = () => {
    drag.current = null;
  };

  const onResizePointerDown = (e: React.PointerEvent) => {
    if (!floating) {
      return;
    }
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    resize.current = {
      startX: e.clientX,
      startY: e.clientY,
      baseW: size.w,
      baseH: size.h,
      basePosX: pos.x,
      basePosY: pos.y,
    };
  };

  const onResizePointerMove = (e: React.PointerEvent) => {
    if (!resize.current) {
      return;
    }
    const w = Math.max(320, Math.min(window.innerWidth - 16, resize.current.baseW + e.clientX - resize.current.startX));
    const h = Math.max(200, Math.min(window.innerHeight - 32, resize.current.baseH + e.clientY - resize.current.startY));
    setSize({ w, h });
    // The window is centered (left/top 50% + negative margins), so growing by Δ
    // shifts its top-left by -Δ/2; compensate so the corner tracks the cursor.
    setPos({
      x: resize.current.basePosX + (w - resize.current.baseW) / 2,
      y: resize.current.basePosY + (h - resize.current.baseH) / 2,
    });
  };

  const onResizePointerUp = () => {
    resize.current = null;
  };

  const toggleMaximize = () => {
    setMaximized((m) => !m);
    setPos({ x: 0, y: 0 });
  };

  const windowStyle: React.CSSProperties = floating
    ? {
      transform: `translate(${pos.x}px, ${pos.y}px)`,
      width: size.w,
      height: size.h,
      marginLeft: -size.w / 2,
      marginTop: -size.h / 2,
    }
    : {};

  return (
    <div
      className={`terminal-window ${maximized ? 'maximized' : ''} ${wiggle ? 'wiggle' : ''}`}
      style={windowStyle}
      onClick={() => inputRef.current?.focus()}
      onAnimationEnd={() => setWiggle(false)}
    >
      <div
        className="term-title-bar"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onDoubleClick={toggleMaximize}
      >
        <div
          className="term-lights"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => e.stopPropagation()}
          onDoubleClick={(e) => e.stopPropagation()}
        >
          <button className="light red" onClick={handleClose} aria-label="Close terminal" />
          <button className="light yellow" onClick={() => setWiggle(true)} aria-label="Minimize terminal" />
          <button
            className="light green"
            onClick={toggleMaximize}
            aria-label="Maximize terminal"
          />
        </div>
        <span className="term-title">terminal — kpsh</span>
        <button className="term-close-mobile" onClick={handleClose} aria-label="Close terminal">
          ✕
        </button>
      </div>

      <div className="term-body" ref={bodyRef}>
        {lines.map((line, i) => (
          <div key={i} className={`term-line ${line.kind}`}>
            {line.text}
          </div>
        ))}
        <div className="term-input-line">
          <span className="term-prompt">{prompt}</span>
          <span className="term-typed">{input}</span>
          <span className="term-caret">█</span>
          <input
            ref={inputRef}
            className="term-hidden-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </div>
      </div>

      {floating && (
        <div
          className="term-resize-handle"
          onPointerDown={onResizePointerDown}
          onPointerMove={onResizePointerMove}
          onPointerUp={onResizePointerUp}
          aria-hidden="true"
        />
      )}

      <style jsx>{`
        .terminal-window {
          position: fixed;
          z-index: 100;
          left: 50%;
          top: 50%;
          width: 600px;
          height: 420px;
          margin-left: -300px;
          margin-top: -210px;
          display: flex;
          flex-direction: column;
          background: var(--bg-primary);
          border: 1px solid var(--border-color);
          border-radius: 10px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.55);
          overflow: hidden;
          font-size: 14px;
        }

        .terminal-window.maximized {
          left: 16px;
          top: 52px;
          right: 16px;
          bottom: 16px;
          width: auto;
          height: auto;
          margin: 0;
        }

        .terminal-window.wiggle {
          animation: term-wiggle 0.4s ease;
        }

        @keyframes term-wiggle {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          30% {
            transform: translateY(10px) scale(0.98);
          }
          65% {
            transform: translateY(4px) scale(0.995);
          }
        }

        .term-title-bar {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
          background: var(--bg-tertiary);
          border-bottom: 1px solid var(--border-color);
          cursor: url('/cursors/grab.svg') 13 15, grab;
          user-select: none;
          touch-action: none;
          flex-shrink: 0;
        }

        .term-title-bar:active {
          cursor: url('/cursors/grabbing.svg') 13 15, grabbing;
        }

        .term-lights {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .light {
          width: 12px;
          height: 12px;
          padding: 0;
          border: none;
          border-radius: 50%;
          cursor: pointer;
        }

        .light.red {
          background: var(--gruvbox-red);
        }

        .light.yellow {
          background: var(--gruvbox-yellow);
        }

        .light.green {
          background: var(--gruvbox-green);
        }

        .light:hover {
          filter: brightness(1.2);
        }

        .term-title {
          flex: 1;
          text-align: center;
          font-size: 13px;
          color: var(--text-muted);
        }

        .term-close-mobile {
          display: none;
          padding: 2px 10px;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-family: inherit;
          font-size: 16px;
          cursor: pointer;
        }

        .term-resize-handle {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 18px;
          height: 18px;
          z-index: 110;
          cursor: url('/cursors/resize.svg') 12 12, nwse-resize;
          touch-action: none;
        }

        .term-resize-handle::after {
          content: '';
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 7px;
          height: 7px;
          border-right: 2px solid var(--text-muted);
          border-bottom: 2px solid var(--text-muted);
          opacity: 0.5;
        }

        .term-body {
          flex: 1;
          overflow-y: auto;
          padding: 12px 14px;
          cursor: text;
        }

        .term-line {
          white-space: pre-wrap;
          word-break: break-word;
          line-height: 1.5;
          color: var(--text-secondary);
        }

        .term-line.input {
          color: var(--text-primary);
        }

        .term-input-line {
          position: relative;
          line-height: 1.5;
          word-break: break-word;
        }

        .term-prompt {
          color: var(--accent);
          margin-right: 8px;
        }

        .term-line.input,
        .term-typed {
          color: var(--text-primary);
        }

        .term-caret {
          color: var(--accent-light);
          animation: caret-blink 1s steps(1) infinite;
        }

        @keyframes caret-blink {
          50% {
            opacity: 0;
          }
        }

        .term-hidden-input {
          position: absolute;
          left: 0;
          top: 0;
          width: 1px;
          height: 1px;
          opacity: 0;
          border: none;
          padding: 0;
        }

        @media (max-width: 768px) {
          .terminal-window {
            inset: 0;
            width: auto;
            height: auto;
            margin: 0;
            border-radius: 0;
            border: none;
          }

          .term-close-mobile {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}
