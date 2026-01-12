'use client';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React, { useEffect, useState, useRef } from 'react';

export interface TerminalCommand {
  cmd: string;
  output: React.ReactNode | string;
  color?: string; // Color for the command text
  delay?: number; // Delay before starting this command
  typingSpeed?: number; // Speed for this specific command
  outputDelay?: number; // Delay before showing the output after typing
}

export interface TerminalTheme {
  background: string;
  text: string;
  headerBackground: string;
  cmdColor: string;
  outputColor: string;
  cursorColor: string;
  borderColor: string;
}

export const defaultThemes: Record<string, TerminalTheme> = {
  dark: {
    background: '#1e1e1e',
    text: '#d4d4d4',
    headerBackground: '#2d2d2d',
    cmdColor: '#ffffff',
    outputColor: '#a6a6a6',
    cursorColor: '#ffffff',
    borderColor: '#333333',
  },
  light: {
    background: '#ffffff',
    text: '#000000',
    headerBackground: '#f3f3f3',
    cmdColor: '#000000',
    outputColor: '#333333',
    cursorColor: '#000000',
    borderColor: '#e5e5e5',
  },
};

interface TerminalProps {
  commands: TerminalCommand[];
  theme?: TerminalTheme | 'dark' | 'light';
  typingSpeed?: number; // ms per character
  className?: string;
  autoStart?: boolean;
}

export function Terminal({
  commands,
  theme = 'dark',
  typingSpeed = 50,
  className,
  autoStart = true,
}: TerminalProps) {
  const [currentCmdIndex, setCurrentCmdIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeTheme = typeof theme === 'string' ? defaultThemes[theme] : theme;

  useEffect(() => {
    if (!autoStart) return;

    let timeoutId: NodeJS.Timeout;

    const processCommand = async () => {
      if (currentCmdIndex >= commands.length) return;

      const currentCommand = commands[currentCmdIndex];
      
      // Delay before starting the command if specified
      if (currentCommand.delay && typedText === '' && !isTyping && !showOutput) {
          await new Promise(resolve => setTimeout(resolve, currentCommand.delay));
      }

      setIsTyping(true);

      // Typing effect
      let charIndex = 0;
      const typeChar = () => {
        if (charIndex < currentCommand.cmd.length) {
          setTypedText(currentCommand.cmd.slice(0, charIndex + 1));
          charIndex++;
          timeoutId = setTimeout(typeChar, currentCommand.typingSpeed ?? typingSpeed);
        } else {
          setIsTyping(false);
          // Wait a bit before showing output
          timeoutId = setTimeout(() => {
            setShowOutput(true);
            // Wait a bit before moving to next command
             timeoutId = setTimeout(() => {
                setHistory((prev) => [...prev, currentCommand]);
                setCurrentCmdIndex((prev) => prev + 1);
                setTypedText('');
                setShowOutput(false);
             }, 800) // Delay after output before next line
          }, currentCommand.outputDelay ?? 500); // Delay after typing before output
        }
      };

      typeChar();
    };

    processCommand();

    return () => clearTimeout(timeoutId);
  }, [currentCmdIndex, commands, autoStart, typingSpeed]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [typedText, history, showOutput]);

  return (
    <div
      className={cn(
        'rounded-xl border shadow-xl overflow-hidden w-full max-w-3xl mx-auto font-mono text-sm leading-relaxed',
        className
      )}
      style={{
        backgroundColor: activeTheme.background,
        borderColor: activeTheme.borderColor,
        color: activeTheme.text,
      }}
    >
      {/* Header */}
      <div
        className="px-4 py-3 flex items-center gap-2 border-b"
        style={{
          backgroundColor: activeTheme.headerBackground,
          borderColor: activeTheme.borderColor,
        }}
      >
        <div className="w-3 h-3 rounded-full bg-red-500/90" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/90" />
        <div className="w-3 h-3 rounded-full bg-green-500/90" />
      </div>

      {/* Terminal Body */}
      <div
        ref={scrollRef}
        className="p-6 h-[400px] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
        style={{
           fontFamily: "'Menlo', 'Monaco', 'Courier New', monospace"
        }}
      >
        <div className="flex flex-col gap-4">
          {/* History */}
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 select-none">{'>'}</span>
                <span style={{ color: item.color || activeTheme.cmdColor }}>
                  {item.cmd}
                </span>
              </div>
              <div
                className="pl-5"
                style={{ color: activeTheme.outputColor }}
              >
                {item.output}
              </div>
            </div>
          ))}

          {/* Current Active Line */}
          {currentCmdIndex < commands.length && (
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-blue-500 select-none">{'>'}</span>
                <span style={{ color: commands[currentCmdIndex].color || activeTheme.cmdColor }}>
                  {typedText}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-4 align-middle ml-1"
                    style={{ backgroundColor: activeTheme.cursorColor }}
                  />
                </span>
              </div>
              
              {showOutput && (
                 <motion.div
                 initial={{ opacity: 0, y: 5 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="pl-5"
                 style={{ color: activeTheme.outputColor }}
               >
                 {commands[currentCmdIndex].output}
               </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
