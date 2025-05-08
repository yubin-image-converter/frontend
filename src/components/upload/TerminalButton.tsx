import { ButtonHTMLAttributes } from "react";

interface TerminalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function TerminalButton({
  children,
  className,
  ...props
}: TerminalButtonProps) {
  function cn(arg0: string, className: string | undefined): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <button
      {...props}
      className={cn(
        "border border-green-500 bg-black px-4 py-2 font-mono text-sm text-green-300 shadow transition duration-150 hover:bg-green-400 hover:text-black",
        className,
      )}
    >
      {children}
    </button>
  );
}
