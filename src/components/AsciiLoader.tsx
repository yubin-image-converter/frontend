import { useEffect, useState } from "react";

export function AsciiLoader() {
  const frames = [
    "[▒░░░░░░░░░░░░░░░░░░░░] Loading...",
    "[▒▒░░░░░░░░░░░░░░░░░░] Loading...",
    "[▒▒▒░░░░░░░░░░░░░░░░░] Loading...",
    "[▒▒▒▒░░░░░░░░░░░░░░░░] Loading...",
    "[▒▒▒▒▒░░░░░░░░░░░░░░░] Loading...",
    "[▒▒▒▒▒▒░░░░░░░░░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒░░░░░░░░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒░░░░░░░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒░░░░░░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒░░░░░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒░] Loading...",
    "[▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒] Loading...",
  ];

  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % frames.length);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <pre className="font-mono text-sm text-green-500">{frames[frame]}</pre>
  );
}
