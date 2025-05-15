import { useAtom, useAtomValue } from "jotai";
import { CloudUpload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { statusAtom } from "@/shared/store/convertAtoms";
import { useResetConversionState } from "@/shared/store/resetAtoms";
import { userAtom } from "@/shared/store/userAtom";

import { Format } from "../types";

interface UploadFormProps {
  onConvert: (file: File, format: Format) => void;
  onRequestLogin: () => void;
}

export function UploadForm({ onConvert, onRequestLogin }: UploadFormProps) {
  const currentUser = useAtomValue(userAtom);
  const isLoggedIn = !!(currentUser && currentUser.email);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [status] = useAtom(statusAtom); // ← 전역 상태에서 읽기
  const resetConversion = useResetConversionState(); // ← 초기화 함수

  const handleReset = () => {
    setFile(null);
    setPreviewUrl(null);
    resetConversion(); // ← jotai 상태 초기화
  };

  const internalDropHandler = useCallback(
    (acceptedFiles: File[]) => {
      if (!isLoggedIn) {
        toast.info("Login required. Please sign in and try again.");
        onRequestLogin();
        return;
      }

      const selected = acceptedFiles[0];
      if (!selected) return;

      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    },
    [isLoggedIn, onRequestLogin],
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: internalDropHandler,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 50 * 1024 * 1024,
    multiple: false,
  });

  const handleConvert = () => {
    if (!file) return;

    if (!isLoggedIn) {
      toast.info("로그인이 필요합니다. 로그인 후 계속해 주세요.");
      onRequestLogin();
      return;
    }

    onConvert(file, "jpg");
  };

  return (
    <div className="flex w-full max-w-full flex-col items-center gap-4 sm:px-4">
      <div
        {...getRootProps()}
        className="w-full max-w-xs cursor-pointer rounded border-2 border-dashed border-green-500 bg-black p-6 text-center text-green-500 hover:bg-[#111] sm:max-w-sm sm:p-8 md:max-w-md"
      >
        <input {...getInputProps()} />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="preview"
            className="h-auto max-h-[300px] w-full rounded object-contain"
          />
        ) : (
          <div className="flex flex-col items-center justify-center">
            <CloudUpload size={48} className="mb-2" />
            <p>Click or drag to upload</p>
          </div>
        )}
      </div>

      {file && (
        <div className="mt-2 flex w-full max-w-xs flex-col justify-center gap-4 sm:max-w-md sm:flex-row">
          <Button
            className="w-full bg-green-500 text-black hover:bg-green-400 sm:w-auto"
            onClick={handleConvert}
          >
            Convert Image
          </Button>

          {(status === "success" || status === "error") && (
            <Button
              variant="outline"
              className="w-full border-green-600 bg-black text-green-300 hover:bg-green-700 hover:text-white sm:w-auto"
              onClick={handleReset}
            >
              Reset Upload
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
