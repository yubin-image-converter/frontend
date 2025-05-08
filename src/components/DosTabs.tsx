import { DosPanel } from "./DosPanel";
import { UploadForm } from "./upload/UploadForm";
import { WorkerPanel } from "./WorkerPanel";

interface DosTabsProps {
  percent: number;
  status: "idle" | "converting" | "success" | "error";
  setPercent: (n: number) => void;
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
  setConvertedImageUrl: (url: string) => void;
}

export function DosTabs({
  percent,
  status,
  setPercent,
  setStatus,
  setConvertedImageUrl,
}: DosTabsProps) {
  return (
    <div className="grid items-start justify-center gap-10 md:grid-cols-2">
      <DosPanel title="UPLOAD FORM">
        <UploadForm
          percent={percent}
          status={status}
          setPercent={setPercent}
          setStatus={setStatus}
          setConvertedImageUrl={setConvertedImageUrl}
        />
      </DosPanel>

      <DosPanel title="WORKER STATUS">
        <WorkerPanel />
      </DosPanel>
    </div>
  );
}
