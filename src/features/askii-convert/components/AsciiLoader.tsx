import { useTypewriterLoop } from "@/shared/hooks";

interface AsciiLoaderProps {
  message?: string;
}

export function AsciiLoader({ message = "Loading..." }: AsciiLoaderProps) {
  const animatedMessage = useTypewriterLoop(message, 50, 1500);
  const frame = Math.min(animatedMessage.length, 20); // 동기화된 frame

  const filled = "▒".repeat(frame);
  const empty = "░".repeat(20 - frame);
  const bar = `[${filled}${empty}]`;

  return (
    <div className="w-full font-mono text-sm text-green-500">
      <div className="flex flex-col items-center justify-center gap-1 font-mono text-sm text-green-500">
        <pre className="text-center">{bar}</pre>
        <pre className="text-center">{animatedMessage}</pre>
      </div>
    </div>
  );
}
