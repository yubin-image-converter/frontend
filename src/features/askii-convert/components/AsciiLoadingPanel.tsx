import { AsciiLoader } from "../components/AsciiLoader";
import { ProgressBar } from "../components/ProgressBar";
import { StatusMessage } from "../components/StatusMessage";

interface AsciiLoadingPanelProps {
  status: "uploading" | "converting" | "success" | "error";
}

export function AsciiLoadingPanel({ status }: AsciiLoadingPanelProps) {
  const showAsciiLoader = status === "uploading" || status === "converting";

  return (
    <div className="flex flex-col items-start gap-2">
      {showAsciiLoader && (
        <AsciiLoader message="Uploading image to server..." />
      )}
      <StatusMessage status={status} />
      {(status === "converting" || status === "success") && <ProgressBar />}
    </div>
  );
}
