import { useEffect, useState } from "react";

interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  // const totalBars = 50;

  // 깜빡이는 커서
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // 회전 스피너
  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [frameIndex, setFrameIndex] = useState(0);
  useEffect(() => {
    if (percent < 100) {
      const spinnerInterval = setInterval(() => {
        setFrameIndex((i) => (i + 1) % spinnerFrames.length);
      }, 100);
      return () => clearInterval(spinnerInterval);
    }
  }, [percent]);

  const spinner = spinnerFrames[frameIndex];
  // const text = percent < 100 ? `Loading... ${spinner}` : "Done!";
  // const paddedText = text
  //   .padStart(Math.floor((totalBars + text.length) / 2), "=")
  //   .padEnd(totalBars, "=");
  const totalBars = 30;
  let text = percent < 100 ? `Loading... ${spinner}` : "Done!";

  // 텍스트가 너무 길면 자르기
  if (text.length > totalBars) {
    text = text.slice(0, totalBars);
  }

  const paddedText = text
    .padStart(Math.floor((totalBars + text.length) / 2), "=")
    .padEnd(totalBars, "=");

  const bar = `[${paddedText}]`;

  return (
    <div className="mt-4 w-full font-mono text-sm text-green-400">
      <div className="mb-1 flex justify-between">
        <span>Progress</span>
        <span>{percent.toFixed(0)}%</span>
      </div>

      <div className="w-full rounded border border-green-700 bg-black p-2">
        <div className="w-full text-center whitespace-pre">
          {bar}
          {showCursor && percent < 100 && <span className="blink ml-1">█</span>}
        </div>
      </div>
    </div>
  );
}
