'use client';

import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';

interface LongTextProps {
  content: string;
  limit?: number; // Word limit
  moreText?: React.ReactNode;
  lessText?: React.ReactNode;
  className?: string;
  textClassName?: string;
  buttonClassName?: string;
}

export function LongText({
  content,
  limit = 30,
  moreText = 'Show more',
  lessText = 'Show less',
  className,
  textClassName,
  buttonClassName,
}: LongTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = content.split(' ');
  const shouldTruncate = words.length > limit;

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const displayedText = isExpanded || !shouldTruncate
    ? content
    : words.slice(0, limit).join(' ') + '...';

  return (
    <div className={cn("text-base leading-relaxed text-fd-foreground", className)}>
      <motion.div
        initial={false}
        animate={{ height: 'auto' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={cn("overflow-hidden", textClassName)}
      >
        {displayedText}
      </motion.div>

      {shouldTruncate && (
        <button
          onClick={toggleExpanded}
          className={cn(
            "mt-2 text-sm font-medium text-blue-600 hover:text-blue-800 focus:outline-none transition-colors",
            buttonClassName
          )}
        >
          {isExpanded ? lessText : moreText}
        </button>
      )}
    </div>
  );
}
