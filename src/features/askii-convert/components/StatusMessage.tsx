import { useTypewriter } from "@/shared/hooks";

interface StatusMessageProps {
  status: "idle" | "uploading" | "converting" | "success" | "error";
}

export function StatusMessage({ status }: StatusMessageProps) {
  const message =
    status === "uploading"
      ? ""
      : status === "converting"
        ? "Converting image. Please wait..."
        : status === "success"
          ? "Conversion complete! Ready to download."
          : status === "error"
            ? "An error occurred. Please try again."
            : "";

  const typed = useTypewriter(message, 35);

  return (
    <div className="mt-2 whitespace-pre-wrap font-mono text-sm text-green-400">
      {typed}
    </div>
  );
}
