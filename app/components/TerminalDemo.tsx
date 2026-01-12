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
    <div className="w-full flex flex-col gap-6 p-8 bg-gray-950 rounded-lg items-center">
      <div className="flex bg-gray-900 p-1 rounded-lg border border-gray-800">
        <button
          onClick={() => setTheme('dark')}
          className={cn(
            "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
             theme === 'dark' ? "bg-gray-800 text-white shadow-sm" : "text-gray-400 hover:text-gray-200"
          )}
        >
          Dark
        </button>
        <button
           onClick={() => setTheme('light')}
           className={cn(
            "px-4 py-1.5 rounded-md text-sm font-medium transition-colors",
             theme === 'light' ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-200"
          )}
        >
          Light
        </button>
      </div>

      <div className="w-full">
        
        <Terminal 
          key={theme} // Reset terminal when theme changes to restart typing effect
          commands={demoCommands} 
          theme={theme}
        />
      </div>
    </div>
  );
}
