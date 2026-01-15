import type { Route } from './+types/home';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { baseOptions } from '@/lib/layout.shared';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Tasteey' },
    { name: 'description', content: 'Welcome to Tasteey UI!' },
  ];
}

export default function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className="relative flex flex-col items-center justify-center text-center flex-1 w-full max-w-5xl mx-auto px-4 py-24 sm:py-32 overflow-x-hidden">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
           className="relative z-10"
        >
          <div className="mb-8 flex justify-center">
            <span className="relative rounded-full bg-fd-primary/10 px-3 py-1 text-sm leading-6 text-fd-primary ring-1 ring-inset ring-fd-primary/20 backdrop-blur-sm">
              Introducing Tasteey v1.0 <span className="font-semibold px-2">→</span>
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-fd-foreground to-fd-muted-foreground bg-clip-text text-transparent">
            Tasteey
          </h1>
          
          <p className="mt-6 text-2xl leading-8 text-fd-muted-foreground max-w-2xl mx-auto">
          No BS, Just Copy, Paste, and Customize.
          </p>
          
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/docs"
              className="rounded-full bg-fd-primary px-8 py-3.5 text-sm font-semibold text-fd-primary-foreground shadow-sm hover:bg-fd-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fd-primary transition-all hover:scale-105 active:scale-95"
            >
              View Components <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span> 
            </Link>
          </div>
        </motion.div>

        {/* Decorative background elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 w-[500px] h-[500px] bg-fd-primary/5 rounded-full blur-3xl opacity-50 animate-pulse" />
      </div>
    </HomeLayout>
  );
}
