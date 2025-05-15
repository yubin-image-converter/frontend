import { useAtomValue } from "jotai";
import { useEffect, useRef, useState } from "react";

import { percentAtom } from "@/shared/store/convertAtoms";

export function ProgressBar() {
  const percent = useAtomValue(percentAtom);

  const [totalBars, setTotalBars] = useState(30);

  useEffect(() => {
    const updateBarLength = () => {
      const width = window.innerWidth;
      if (width < 400) setTotalBars(20);
      else if (width < 768) setTotalBars(30);
      else setTotalBars(40);
    };

    updateBarLength();
    window.addEventListener("resize", updateBarLength);
    return () => window.removeEventListener("resize", updateBarLength);
  }, []);

  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  const spinnerFrames = useRef([
    "⠋",
    "⠙",
    "⠹",
    "⠸",
    "⠼",
    "⠴",
    "⠦",
    "⠧",
    "⠇",
    "⠏",
  ]);
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    if (percent < 100) {
      const interval = setInterval(() => {
        setFrameIndex((i) => (i + 1) % spinnerFrames.current.length);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [percent]);

  const [showDone, setShowDone] = useState(false);
  useEffect(() => {
    if (percent >= 100) {
      const timer = setTimeout(() => setShowDone(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowDone(false);
    }
  }, [percent]);

  const spinner = spinnerFrames.current[frameIndex];
  let content =
    percent < 100
      ? `Loading... ${spinner}`
      : showDone
        ? "✓ Done!"
        : `Loading... ${spinner}`;

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
      <div className="w-full rounded border border-green-700 bg-black py-2">
        <pre className="overflow-hidden whitespace-pre-wrap break-words text-center">
          [{paddedText}]
          {showCursor && percent < 100 && <span className="ml-1">█</span>}
        </pre>
      </div>
    </div>
  );
}
