import { CloudUpload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/shared/lib/userStore";

import { Format, formatOptions } from "../types";

interface UploadFormProps {
  onConvert: (file: File, format: Format) => void;
  onRequestLogin: () => void;
}

export function UploadForm({ onConvert, onRequestLogin }: UploadFormProps) {
  const currentUser = getCurrentUser();
  const isLoggedIn = !!(currentUser && currentUser.email);

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<Format>("jpg");

  const internalDropHandler = useCallback(
    (acceptedFiles: File[]) => {
      if (!isLoggedIn) {
        toast.info("로그인이 필요합니다. 로그인 후 다시 시도해 주세요.");
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
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleConvert = () => {
    if (!file) return;

    if (!isLoggedIn) {
      toast.info("로그인이 필요합니다. 로그인 후 계속해 주세요.");
      onRequestLogin();
      return;
    }

    onConvert(file, format);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* 업로드 박스 */}
      <div
        {...getRootProps()}
        className="w-full max-w-md cursor-pointer rounded border-2 border-dashed border-green-500 bg-black p-8 text-center text-green-500 hover:bg-[#111]"
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

      {/* 포맷 선택 & 변환 */}
      {file && (
        <>
          <div className="flex gap-2">
            {formatOptions.map((f) => (
              <button
                key={f}
                onClick={() => setFormat(f)}
                className={`rounded border border-green-500 px-3 py-1 text-sm capitalize ${
                  format === f
                    ? "bg-green-600 text-black"
                    : "bg-black text-green-300 hover:bg-green-800 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <Button
            className="bg-green-500 text-black hover:bg-green-400"
            onClick={handleConvert}
          >
            Convert Image
          </Button>
        </>
      )}
    </div>
  );
}
