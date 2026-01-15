import type { ReactNode } from "react";
import React, {
  createContext,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import confetti from "canvas-confetti";

type ConfettiOptions = confetti.Options & { canvas?: HTMLCanvasElement };

interface ConfettiRef {
  fire: (opts?: ConfettiOptions) => void;
}

interface ConfettiProps extends ConfettiOptions {
  options?: ConfettiOptions;
  manualstart?: boolean;
  resize?: boolean;
  useWorker?: boolean;
  children?: ReactNode;
  className?: string; // Standard prop, though usually this component renders a fixed canvas or nothing if global
}

const ConfettiContext = createContext<ConfettiRef>({} as ConfettiRef);

const Confetti = forwardRef<ConfettiRef, ConfettiProps>((props, ref) => {
  const {
    options,
    manualstart = false,
    resize = true,
    useWorker = true,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const confettiInstance = useRef<confetti.CreateTypes | null>(null);


  const fire = useCallback(
    (opts: ConfettiOptions = {}) => {
      confetti({
        ...options,
        ...opts,
        resize,
        useWorker,
      } as any);
    },
    [options, resize, useWorker]
  );
  
  useImperativeHandle(ref, () => ({
    fire,
  }));

  useEffect(() => {
    if (!manualstart) {
      fire();
    }
  }, [manualstart, fire]);

  return (
    <ConfettiContext.Provider value={{ fire }}>
      {props.children}
    </ConfettiContext.Provider>
  );
});

Confetti.displayName = "Confetti";

 interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    options?: ConfettiOptions;
    children?: React.ReactNode;
 }
 
 const ConfettiButton = forwardRef<HTMLButtonElement, ConfettiButtonProps>((props, ref) => {
    const { options, children, onClick, ...buttonProps } = props;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;
        
        confetti({
            ...options,
            origin: { x, y }
        });

        if (onClick) {
            onClick(event);
        }
    }

    return (
        <button ref={ref} onClick={handleClick} {...buttonProps}>
            {children}
        </button>
    )

 });
 ConfettiButton.displayName = "ConfettiButton";

export { Confetti, ConfettiButton };

export default Confetti;
