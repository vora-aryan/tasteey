import { cn } from "@/lib/utils";

interface HandWrittenTextProps {
  children: React.ReactNode;
  className?: string;
  type?: "amatic" | "just";
  as?: React.ElementType;
  color?: string;
  space?: number; // Letter spacing in rem
  aspectRatio?: "1/1" | "16/9" | "4/3" | "3/4" | "21/9";
  image?: string; // Custom background image URL
}

export function HandWrittenText({
  children,
  className,
  type = "just",
  as: Component = "p",
  color = "#0036cbff", // Default ballpoint pen blue
  space = 0.05,
  aspectRatio,
  image = "/paper-texture.jpg",
}: HandWrittenTextProps) {
  const fontClass = {
    amatic: "font-hand-amatic",
    just: "font-hand-just",
  };

  const aspectStyles = {
    "1/1": { aspectRatio: "1 / 1" },
    "16/9": { aspectRatio: "16 / 9" },
    "4/3": { aspectRatio: "4 / 3" },
    "3/4": { aspectRatio: "3 / 4" },
    "21/9": { aspectRatio: "21 / 9" },
  };

  return (
    <Component
      className={cn(
        "text-2xl p-8 rounded-lg shadow-md",
        fontClass[type],
        className
      )}
      style={{
        backgroundImage: `url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: color,
        letterSpacing: `${space}em`,
        textShadow: "0.5px 0.5px 0px rgba(0,0,0,0.3)", // Subtle ink depth
        ...(aspectRatio ? aspectStyles[aspectRatio] : {}),
      }}
    >
      {children}
    </Component>
  );
}
