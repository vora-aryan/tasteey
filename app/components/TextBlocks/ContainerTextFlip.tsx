import React, { useEffect, useRef, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

interface ContainerTextFlipProps {
  words: string[];
  interval?: number;
  className?: string;
}

export const ContainerTextFlip: React.FC<ContainerTextFlipProps> = ({
  words,
  interval = 3000,
  className,
}) => {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | 'auto'>('auto');
  const textRef = useRef<HTMLDivElement>(null);

  // Cycle through words
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  // Measure width
  useEffect(() => {
    if (textRef.current) {
        // Add padding to the measured width
      setWidth(textRef.current.scrollWidth + 40); 
    }
  }, [index, words]);

  const currentWord = words[index];
  const characters = useMemo(() => currentWord.split(''), [currentWord]);

  return (
    <div className={cn("flex justify-center items-center py-20 bg-transparent dark:bg-transparent")}>
      <motion.div
        animate={{ width }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn(
            "relative flex justify-center items-center overflow-hidden rounded-xl h-24 sm:h-32",
            // Light Mode: Gray gradient + 3D distinct shadows
            "bg-gradient-to-b from-gray-50 to-gray-200 shadow-[inset_0_-4px_4px_rgba(0,0,0,0.1),0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]",
            // Dark Mode: Dark gray gradient + dark shadows/borders
            "dark:from-neutral-800 dark:to-neutral-900 dark:shadow-[inset_0_-2px_4px_rgba(0,0,0,0.5),0_4px_6px_rgba(0,0,0,0.3)] dark:border dark:border-neutral-700",className
        )}
      >
        {/* Invisible measuring element */}
        <div
          ref={textRef}
          className="absolute opacity-0 pointer-events-none whitespace-nowrap text-4xl sm:text-7xl font-bold px-8"
          aria-hidden="true"
        >
          {currentWord}
        </div>

        {/* Visible animated text */}
        <div className="flex gap-[2px] items-center z-10 font-bold text-gray-800 dark:text-gray-100 text-4xl sm:text-7xl select-none">
          <AnimatePresence mode="popLayout">
             {characters.map((char, i) => (
                <motion.span
                    key={`${index}-${i}`}
                    initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                    animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    exit={{ opacity: 0, filter: "blur(10px)", y: -10, position: "absolute" }}
                    transition={{
                        duration: 0.4,
                        delay: i * 0.05,
                        ease: "easeOut"
                    }}
                    className="inline-block"
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
             ))}
          </AnimatePresence>
        </div>
        
        {/* Subtle highlight for 3D effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />
      </motion.div>
    </div>
  );
};
