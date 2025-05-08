import { ResponsiveLayout } from "./ResponsiveLayout";
import { UploadForm } from "./upload/UploadForm";
import { WorkerPanel } from "./WorkerPanel";

interface MainProps {
  percent: number;
  status: "idle" | "converting" | "success" | "error";
  setPercent: (n: number) => void;
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
  setConvertedImageUrl: (url: string) => void;
}

export function Main({
  percent,
  status,
  setPercent,
  setStatus,
  setConvertedImageUrl,
}: MainProps) {
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <ResponsiveLayout
          left={
            <UploadForm
              percent={percent}
              status={status}
              setPercent={setPercent}
              setStatus={setStatus}
              setConvertedImageUrl={setConvertedImageUrl}
            />
          }
          right={<WorkerPanel />}
        />
      </div>
    </main>
  );
}
