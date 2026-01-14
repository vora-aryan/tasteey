import { useRef } from "react";
import confetti from "canvas-confetti";
import { Confetti, ConfettiButton } from "./ui/Confetti";

// Shared Button for demos
const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button 
    {...props} 
    className={`px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition ${props.className}`}
  />
);

export function ConfettiManual() {
  const confettiRef = useRef<{ fire: (opts?: any) => void }>(null);

  return (
    <div className="flex gap-4 items-center justify-center border p-8 rounded-lg">
        <Confetti ref={confettiRef} />
        <Button onClick={() => confettiRef.current?.fire()}>
            Fire Manual (Top Center)
        </Button>
    </div>
  );
}

export function ConfettiFireworks() {
  const fireFireworks = () => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
      <div className="flex justify-center border p-8 rounded-lg">
        <Button onClick={fireFireworks}>
            Launch Fireworks
        </Button>
      </div>
  );
}

export function ConfettiSide() {
  const fireSide = (origin: { x: number, y: number }) => {
     confetti({
        particleCount: 100,
        spread: 70,
        origin: origin
     });
  }

  return (
    <div className="flex flex-wrap gap-4 justify-center border p-8 rounded-lg">
        <Button onClick={() => fireSide({ x: 0, y: 0.5 })}>Left</Button>
        <Button onClick={() => fireSide({ x: 1, y: 0.5 })}>Right</Button>
        <Button onClick={() => fireSide({ x: 0.5, y: 1 })}>Bottom</Button>
    </div>
  );
}

// Main Demo Component (aggregates them for the /confetti-demo page if needed, or serves as a generic demo)
// But strictly for the doc "Preview", we might want a simple ConfettiButton case.
export function ConfettiDemo() {
  return (
    <div className="flex flex-col gap-8 items-center justify-center min-h-[400px]">
        <ConfettiButton className="bg-black-200" options={{ spread: 90, particleCount: 50 }}>
            Click Me
        </ConfettiButton>
    </div>
  )
}

export default ConfettiDemo;
