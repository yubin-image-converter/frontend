interface ResponsiveLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function ResponsiveLayout({ left, right }: ResponsiveLayoutProps) {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 md:flex-row">
      <div className="w-full md:w-2/5">{left}</div>
      <div className="w-full md:w-3/5">{right}</div>
    </div>
  );
}
