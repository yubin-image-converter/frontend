interface DosPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  minWidth: number;
}

export function DosPanel({
  title,
  children,
  className,
  minWidth = 20,
}: DosPanelProps) {
  const content = `[ ${title} ]`;
  const totalWidth = Math.max(minWidth, content.length + 4); // 좌우 공백 포함

  const bar = "═".repeat(totalWidth);
  const paddedTitle = content
    .padStart(Math.floor((totalWidth + content.length) / 2), " ")
    .padEnd(totalWidth, " ");
  return (
    <div
      className={`w-full bg-black font-mono text-sm leading-none text-green-400 ${className}`}
      style={{ minHeight: "400px", display: "flex", flexDirection: "column" }}
    >
      <pre className="mb-1">{`╔${bar}╗`}</pre>
      <pre className="mb-1">{`║${paddedTitle}║`}</pre>
      <pre className="mb-1">{`╚${bar}╝`}</pre>

      <div className="mt-2 flex-1 overflow-auto rounded border border-green-500 bg-black p-4">
        {children}
      </div>
    </div>
  );
}
