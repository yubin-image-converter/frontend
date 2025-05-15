// ConvertContainer.tsx
import { useAtom, useAtomValue } from "jotai";
import { useState } from "react";

import { AuthModal } from "@/features/auth/AuthModal";
import { logoutUser } from "@/shared/lib/logoutUser";
import { getCurrentUser } from "@/shared/lib/userStore";
import {
  percentAtom,
  statusAtom,
  txtUrlAtom,
} from "@/shared/store/convertAtoms";

import { ConvertedImagePreview, UploadForm, WorkerPanel } from "../components";
import { AsciiLoadingPanel } from "../components/AsciiLoadingPanel";
import { userAtom } from "@/shared/store/userAtom";

interface Props {
  handleConvert: (file: File) => void;
}

export function ConvertContainer({ handleConvert }: Props) {
  // const currentUser = useAtomValue(userAtom);
  const [authOpen, setAuthOpen] = useState(false);

  // jotai 상태 가져오기
  const [txtUrl] = useAtom(txtUrlAtom);
  const [status] = useAtom(statusAtom);
  // const [percent] = useAtom(percentAtom);

  // const handleReset = () => {
  //   setStatus("idle");
  //   // 추가적으로 필요하면 여기서 상태 초기화 더 가능
  // };

  return (
    <div className="flex flex-col gap-6 px-4 transition-all duration-300 sm:px-6 lg:px-8">
      <div
        className={`mx-auto flex w-full max-w-full flex-col items-center gap-6 transition-all duration-500 md:flex-row ${
          txtUrl ? "md:items-start md:justify-between" : "md:justify-center"
        }`}
      >
        <div className="w-full max-w-[360px] shrink-0">
          <UploadForm
            onConvert={handleConvert}
            onRequestLogin={() => setAuthOpen(true)}
          />
        </div>

        {txtUrl && (
          <div className="w-full min-w-0 flex-1 overflow-hidden md:max-w-[768px]">
            <ConvertedImagePreview txtUrl={txtUrl} />
          </div>
        )}
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {status !== "idle" && (
        <>
          <AsciiLoadingPanel status={status} />
          <WorkerPanel />
        </>
      )}
    </div>
  );
}
