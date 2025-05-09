import { useEffect, useState } from "react";

interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  const totalBars = 30;

  // blinking █
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  // spinner
  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [frameIndex, setFrameIndex] = useState(0);
  useEffect(() => {
    if (percent < 100) {
      const interval = setInterval(() => {
        setFrameIndex((i) => (i + 1) % spinnerFrames.length);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [percent, spinnerFrames.length]);

  const spinner = spinnerFrames[frameIndex];
  let content = percent < 100 ? `Loading... ${spinner}` : "✓ Done!";

  if (content.length > totalBars) {
    content = content.slice(0, totalBars);
  }

  const paddedText = content
    .padStart(Math.floor((totalBars + content.length) / 2), "▒")
    .padEnd(totalBars, "▒");

  return (
    <div className="mt-4 w-full font-mono text-sm text-green-400">
      <div className="mb-1 flex justify-between">
        <span>Progress</span>
        <span>{percent.toFixed(0)}%</span>
      </div>
      <div className="w-full rounded border border-green-700 bg-black p-2">
        <pre className="whitespace-pre text-center">
          [{paddedText}]
          {showCursor && percent < 100 && <span className="ml-1">█</span>}
        </pre>
      </div>
    </div>
  );
}
