import { cn } from "@/lib/utils";
import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "destructive";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-fd-primary text-fd-primary-foreground hover:bg-fd-primary/80":
            variant === "default",
          "border-transparent bg-fd-secondary text-fd-secondary-foreground hover:bg-fd-secondary/80":
            variant === "secondary",
          "text-fd-foreground": variant === "outline",
          "border-transparent bg-red-500 text-white hover:bg-red-500/80":
            variant === "destructive",
        },
        className
      )}
      {...props}
    />
  );
}
