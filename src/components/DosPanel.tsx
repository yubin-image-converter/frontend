interface DosPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function DosPanel({ title, children, className }: DosPanelProps) {
  const width = 40;
  const bar = "═".repeat(width);
  const paddedTitle = `[ ${title} ]`
    .padStart(Math.floor((width + title.length) / 2), " ")
    .padEnd(width, " ");

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
