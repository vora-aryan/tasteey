'use client';

import { cn } from '@/lib/utils';
import { motion, type HTMLMotionProps, type Variant } from 'motion/react';
import React, { useState } from 'react';

interface BlurTextProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  blur?: string; // e.g. "10px"
  hoverToReveal?: boolean;
  clickToReveal?: boolean;
  revealDuration?: number;
  className?: string;
}

export function BlurText({
  children,
  blur = '8px',
  hoverToReveal = false,
  clickToReveal = false,
  revealDuration = 0.3,
  className,
  animate,
  ...props
}: BlurTextProps) {
  const [isRevealed, setIsRevealed] = useState(false);

  // If neither interaction is enabled, stays blurred unless controlled externally
  // But usually "BlurText" implies it's blurred by default.
  // If no reveal interaction is set, it remains blurred forever? 
  // Or maybe it's just a text that is blurry.
  
  const isInteractive = hoverToReveal || clickToReveal;

  const handleHoverStart = () => {
    if (hoverToReveal) setIsRevealed(true);
  };

  const handleHoverEnd = () => {
    if (hoverToReveal) setIsRevealed(false);
  };

  const handleClick = () => {
    if (clickToReveal) setIsRevealed(!isRevealed);
  };

  const variants = {
    blurred: {
      filter: `blur(${blur})`,
      opacity: 0.8, // Optional: reduce opacity slightly when blurred for effect
    },
    revealed: {
      filter: 'blur(0px)',
      opacity: 1,
    },
  };

  return (
    <motion.div
      className={cn('inline-block cursor-default relative', className, {
        'cursor-pointer': clickToReveal,
      })}
      initial="blurred"
      animate={isInteractive ? (isRevealed ? 'revealed' : 'blurred') : 'blurred'}
      variants={variants}
      transition={{ duration: revealDuration, ease: 'easeOut' }}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      onClick={handleClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
