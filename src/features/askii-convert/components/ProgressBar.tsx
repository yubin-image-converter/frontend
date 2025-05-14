import { useEffect, useState } from "react";

interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  const [totalBars, setTotalBars] = useState(30); // 기본값

  // 뷰포트 기준으로 bar 길이 설정
  useEffect(() => {
    const updateBarLength = () => {
      const width = window.innerWidth;
      if (width < 400)
        setTotalBars(20); // 모바일
      else if (width < 768)
        setTotalBars(30); // 태블릿
      else setTotalBars(40); // 데스크탑
    };

    updateBarLength(); // 초기 설정
    window.addEventListener("resize", updateBarLength);
    return () => window.removeEventListener("resize", updateBarLength);
  }, []);

  // █ 커서 깜빡임
  const [showCursor, setShowCursor] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 0);
    return () => clearInterval(interval);
  }, []);

  // Spinner 애니메이션
  const spinnerFrames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  const [frameIndex, setFrameIndex] = useState(0);
  useEffect(() => {
    if (percent < 100) {
      const interval = setInterval(() => {
        setFrameIndex((i) => (i + 1) % spinnerFrames.length);
      }, 80);
      return () => clearInterval(interval);
    }
  }, [percent]);

  // Done 표시 딜레이
  const [showDone, setShowDone] = useState(false);
  useEffect(() => {
    if (percent >= 100) {
      const timer = setTimeout(() => setShowDone(true), 500);
      return () => clearTimeout(timer);
    } else {
      setShowDone(false);
    }
  }, [percent]);

  const spinner = spinnerFrames[frameIndex];
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
        <pre className="whitespace-pre text-center">
          [{paddedText}]
          {showCursor && percent < 100 && <span className="ml-1">█</span>}
        </pre>
      </div>
    </div>
  );
}
