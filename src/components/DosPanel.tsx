interface DosPanelProps {
  title: string;
  children: React.ReactNode;
  width?: number; // optional 고정 폭
}

export function DosPanel({ title, children, width = 40 }: DosPanelProps) {
  const bar = "═".repeat(width);
  const paddedTitle = `[ ${title} ]`
    .padStart(Math.floor((width + title.length) / 2), " ")
    .padEnd(width, " ");

  return (
    <div className="w-full bg-black font-mono text-sm leading-none text-green-400">
      <pre className="mb-1">{`╔${bar}╗`}</pre>
      <pre className="mb-1">{`║${paddedTitle}║`}</pre>
      <pre className="mb-1">{`╚${bar}╝`}</pre>
      <div className="mt-2 rounded border border-green-500 bg-black p-4">
        {children}
      </div>
    </div>
  );
}
