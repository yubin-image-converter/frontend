import { ReactNode } from "react";

interface ResponsiveLayoutProps {
  left: ReactNode;
  right: ReactNode;
}

export function ResponsiveLayout({ left, right }: ResponsiveLayoutProps) {
  return (
    <div className="flex w-full max-w-5xl flex-col items-stretch gap-8 md:flex-row">
      <section className="flex w-full flex-col items-center gap-4 rounded-lg border p-4 shadow-sm md:w-1/3">
        {left}
      </section>
      <section className="w-full rounded-lg border bg-muted p-6 md:w-2/3">
        {right}
      </section>
    </div>
  );
}
