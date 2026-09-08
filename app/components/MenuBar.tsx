'use client';

/* eslint-disable react-hooks/set-state-in-effect -- state intentionally syncs from
   the external theme applied to <html> by the no-flash script in layout.tsx */

import { useEffect, useState } from 'react';
import { useFinder } from '../context/FinderContext';
import { LightModeIcon, DarkModeIcon } from './icons';

interface MenuBarProps {
  firstName: string;
  lastName: string;
}

function formatClock(d: Date) {
  const date = d
    .toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })
    .replace(/,/g, '');
  const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  return { date, time };
}

export function MenuBar({ firstName, lastName }: MenuBarProps) {
  const { openTerminal } = useFinder();
  // Clock renders only after mount: the page is statically exported, so any
  // server-rendered time would be stale and mismatch on hydration.
  const [now, setNow] = useState<Date | null>(null);
  // Read after mount to match whatever the no-flash script in layout.tsx already applied.
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const tick = () => setNow(new Date());
    const timeout = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(id);
    };
  }, []);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (next === 'light') {
      document.documentElement.dataset.theme = 'light';
    } else {
      delete document.documentElement.dataset.theme;
    }
    localStorage.setItem('theme', next);
  };

  const clock = now ? formatClock(now) : null;

  return (
    <div className="menu-bar">
      <div className="menu-left">
        <img src="/kp-rune.png" width={20} height={20} alt="KP" className="menu-logo" />
        <span className="menu-name">
          <span className="menu-accent">{firstName}</span>{lastName}
        </span>
      </div>
      <div className="menu-right">
        <button
          className="menu-theme"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        >
          {theme === 'dark'
            ? <DarkModeIcon sx={{ fontSize: 18, color: 'var(--gruvbox-blue)' }} />
            : <LightModeIcon sx={{ fontSize: 18, color: 'var(--gruvbox-yellow)' }} />}
        </button>
        <button className="menu-terminal" onClick={openTerminal} aria-label="Open terminal">
          &gt;_
        </button>
        {clock && (
          <span className="menu-clock">
            <span className="clock-date">{clock.date}&nbsp;&nbsp;</span>
            {clock.time}
          </span>
        )}
      </div>

      <style jsx>{`
        .menu-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 36px;
          padding: 0 16px;
          background: var(--bg-secondary);
          border-bottom: 1px solid var(--border-color);
          font-size: 14px;
          flex-shrink: 0;
          user-select: none;
          position: relative;
          z-index: 2;
        }

        .menu-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .menu-bar :global(.menu-logo) {
          user-select: none;
          pointer-events: none;
        }

        .menu-name {
          font-weight: 700;
          color: var(--text-primary);
        }

        .menu-accent {
          color: var(--accent);
        }

        .menu-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .menu-terminal {
          padding: 2px 8px;
          background: transparent;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--accent-light);
          font-family: inherit;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .menu-terminal:hover {
          background: var(--bg-tertiary);
          border-color: var(--accent);
        }

        .menu-theme {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          background: transparent;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s;
          opacity: 0.85;
        }

        .menu-theme:hover {
          opacity: 1;
          transform: scale(1.12);
          background: var(--bg-tertiary);
        }

        .menu-clock {
          color: var(--text-secondary);
          white-space: nowrap;
          font-variant-numeric: tabular-nums;
        }

        @media (max-width: 768px) {
          .menu-bar {
            height: 32px;
            padding: 0 12px;
            font-size: 13px;
          }

          .menu-name {
            display: none;
          }

          .clock-date {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
