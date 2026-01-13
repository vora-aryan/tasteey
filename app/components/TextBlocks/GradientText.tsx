import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  animate?: boolean;
  as?: React.ElementType; // The HTML element to render, e.g., 'h1', 'div', etc.
}

export function GradientText({
  children,
  className,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
  animate = true,
  as: Component = "div",
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <Component
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium transition-shadow duration-500 overflow-hidden cursor-pointer",
        className
      )}
    >
      {showBorder && (
        <div
          className={cn(
            "absolute inset-0 bg-cover z-0 pointer-events-none animate-gradient",
            animate && "animate-gradient"
          )}
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="absolute inset-0 bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        </div>
      )}
      <div
        className="inline-block relative z-2 bg-clip-text text-transparent"
        style={{
          ...gradientStyle,
          backgroundSize: "300% 100%",
          animation: animate ? `gradient ${animationSpeed}s linear infinite` : undefined,
        }}
      >
        {children}
      </div>
    </Component>
  );
}
