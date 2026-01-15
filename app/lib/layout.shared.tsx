import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <img src="/favicon.svg" alt="Tasteey Logo" className="w-8 h-8" />
          <span className="text-xl font-bold bg-gradient-to-r from-fd-primary to-fd-foreground bg-clip-text text-transparent">
            Tasteey
          </span>
        </div>
      ),
    },
    links: [
      {
        text: 'Documentation',
        url: '/docs',
        active: 'nested-url',
      },
    ],
  };
}
