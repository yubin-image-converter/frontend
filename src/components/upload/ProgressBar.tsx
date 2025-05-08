interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="mt-4 h-4 w-full rounded-full bg-gray-200">
      <div
        className="h-4 rounded-full bg-blue-500 transition-all"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
