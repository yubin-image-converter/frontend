interface StatusMessageProps {
  status: "idle" | "converting" | "success" | "error";
}

import { useTypewriter } from "@/hooks/useTypewriter";

interface StatusMessageProps {
  status: "idle" | "converting" | "success" | "error";
}

export function StatusMessage({ status }: StatusMessageProps) {
  const message =
    status === "converting"
      ? "Converting image. Please wait..."
      : status === "success"
        ? "Conversion complete! Ready to download."
        : status === "error"
          ? "An error occurred. Please try again."
          : "";

  const typed = useTypewriter(message, 35);

  return (
    <div className="mt-2 font-mono text-sm whitespace-pre-wrap text-green-400">
      {typed}
    </div>
  );
}
