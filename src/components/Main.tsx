import { AuthButton } from "./auth/AuthButton";
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
      <ResponsiveLayout
        left={<AuthButton />}
        right={
          <div className="flex w-full flex-col gap-6 md:flex-row">
            <div className="flex-1">
              <UploadForm
                percent={percent}
                status={status}
                setPercent={setPercent}
                setStatus={setStatus}
                setConvertedImageUrl={setConvertedImageUrl}
              />
            </div>
            <WorkerPanel />
          </div>
        }
      />
    </main>
  );
}
