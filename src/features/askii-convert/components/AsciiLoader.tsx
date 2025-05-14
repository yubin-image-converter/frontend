// import { useEffect, useState } from "react";

// export function AsciiLoader() {
//   const frames = [
//     "[▒░░░░░░░░░░░░░░░░░░░░] Loading...",
//     "[▒▒░░░░░░░░░░░░░░░░░░] Loading...",
//     "[▒▒▒░░░░░░░░░░░░░░░░░] Loading...",
//     "[▒▒▒▒░░░░░░░░░░░░░░░░] Loading...",
//     "[▒▒▒▒▒░░░░░░░░░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒░░░░░░░░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒░░░░░░░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒░░░░░░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒░░░░░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░] Loading...",
//     "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒] Loading...",
//   ];

//   const [frame, setFrame] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setFrame((prev) => (prev + 1) % frames.length);
//     }, 60);
//     return () => clearInterval(interval);
//   }, [frames.length]);

//   return (
//     <pre className="font-mono text-sm text-green-500">{frames[frame]}</pre>
//   );
// }
import { useTypewriterLoop } from "@/shared/hooks";
import { useEffect, useState } from "react";

interface AsciiLoaderProps {
  message?: string;
}

export function AsciiLoader({ message = "Loading..." }: AsciiLoaderProps) {
  const animatedMessage = useTypewriterLoop(message, 50, 1500); // speed & delay 조절 가능
  const [frame, setFrame] = useState(0);

  const frames = Array.from({ length: 20 }, (_, i) => {
    const filled = "▒".repeat(i + 1);
    const empty = "░".repeat(20 - i - 1);
    const bar = `[${filled}${empty}]`;

    const shouldBreak =
      typeof window !== "undefined" && window.innerWidth < 480;
    const msg = shouldBreak ? `\n${animatedMessage}` : ` ${animatedMessage}`;

    return `${bar}${msg}`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 60);
    return () => clearInterval(interval);
  }, [frames.length]);

  return (
    <pre className="max-w-full overflow-x-auto whitespace-pre-wrap break-words font-mono text-sm text-green-500">
      {frames[frame]}
    </pre>
  );
}
