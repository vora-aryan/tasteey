'use client';

import { Terminal, type TerminalCommand } from '@/components/Terminal';
import React from 'react';
import { cn } from '@/lib/utils';

const demoCommands: TerminalCommand[] = [
  {
    cmd: 'npm install tasteey',
    output: (
      <div className="text-sm">
        <span className="text-green-500">✔</span> Packages installed successfully in 1.4s
      </div>
    ),
    delay: 0,
  },
  {
    cmd: 'npm run dev',
    output: (
      <div className="text-sm space-y-1">
        <div>
          <span className="text-green-500">ready</span> started server on 0.0.0.0:3000, url: http://localhost:3000
        </div>
        <div className="text-gray-500">info  - Loaded env from .env</div>
      </div>
    ),
    typingSpeed: 80,
    delay: 0,
  },
  {
    cmd: 'echo "Custom Theme Support!"',
    output: 'The terminal supports fully customizable themes and typing speeds.',
    color: '#a855f7',
    typingSpeed: 40,
    delay: 0,
  },
];

export function TerminalDemo() {
  const [theme, setTheme] = React.useState<'dark' | 'light'>('dark');

  return (
    <>
    <div className="w-full relative bg-gray-950 rounded-lg overflow-hidden border border-gray-900">
      {/* Theme Toggle - Top Right */}
      <div className="absolute top-2 right-4 z-10 flex items-center gap-2 justify-center">
        <span className="text-xs text-gray-400 font-medium">
          {theme === 'dark' ? 'Dark' : 'Light'}
        </span>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className={cn(
            "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
            theme === 'dark' ? "bg-gray-700" : "bg-gray-200"
          )}
        >
          <span
            className={cn(
              "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
              theme === 'dark' ? "translate-x-4" : "translate-x-0.5"
            )}
          />
        </button>
      </div>

      <div className="w-full">
        <Terminal 
          key={theme} // Reset terminal when theme changes
          commands={demoCommands} 
          theme={theme}
          className="w-full max-w-none m-0 border-none shadow-none rounded-none"
        />
      </div>
    </div>
    </>
  );
}
