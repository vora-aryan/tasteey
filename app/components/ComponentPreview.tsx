'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Monitor, Code } from 'lucide-react';

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  // We can add props here if needed
}

export function ComponentPreview({ children, className, ...props }: ComponentPreviewProps) {
  const [activeTab, setActiveTab] = React.useState<'preview' | 'code'>('preview');

  // Filter children to find the Preview and CodeContent subcomponents
  const previewContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === Preview
  );
  const codeContent = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === CodeContent
  );

  return (
    <div className={cn("my-6 flex flex-col space-y-4", className)} {...props}>
      {/* Tab Triggers - Detached from content */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab('preview')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
            activeTab === 'preview'
              ? "bg-fd-secondary text-fd-secondary-foreground"
              : "bg-transparent text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-secondary/50"
          )}
        >
          <Monitor className="w-4 h-4" />
          Preview
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer",
            activeTab === 'code'
              ? "bg-fd-secondary text-fd-secondary-foreground"
              : "bg-transparent text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-secondary/50"
          )}
        >
          <Code className="w-4 h-4" />
          Code
        </button>
      </div>

      {/* Content Area - Boxed */}
      <div className="">
        {activeTab === 'preview' && (
           <div className="w-full">
             {previewContent}
           </div>
        )}
        {activeTab === 'code' && (
           <div className="w-full [&_pre]:my-0 [&_pre]:max-h-[500px] [&_pre]:overflow-auto p-0">
             {codeContent}
           </div>
        )}
      </div>
    </div>
  );
}

export function Preview({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-10 min-h-[350px] flex items-center justify-center rounded-xl border border-fd-border", className)}>{children}</div>;
}

export function CodeContent({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)}>{children}</div>;
}
