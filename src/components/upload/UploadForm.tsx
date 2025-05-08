import "react-loading-skeleton/dist/skeleton.css";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Skeleton from "react-loading-skeleton";
import { CloudUpload } from "lucide-react";

import { Button } from "../ui/button";
import { ConvertedImagePreview } from "./ConvertedImagePreview";
import { ProgressBar } from "./ProgressBar";
import { StatusMessage } from "./StatusMessage";

const formatOptions = ["jpg", "png", "webp"] as const;
type Format = (typeof formatOptions)[number];

interface UploadFormProps {
  setPercent: (n: number) => void;
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
  setConvertedImageUrl: (url: string) => void;
  percent: number;
  status: "idle" | "converting" | "success" | "error";
}

export function UploadForm({
  setPercent,
  setStatus,
  setConvertedImageUrl,
  percent,
  status,
}: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState<Format>("jpg");

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setFormat("jpg");
    setLoading(false);
    setPercent(0);
    setStatus("idle");
    setConvertedImageUrl("");
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (!selected) return;
    setFile(selected);
    setConvertedUrl(null);
    setPreviewUrl(URL.createObjectURL(selected));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxSize: 10 * 1024 * 1024,
    multiple: false,
  });

  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setStatus("converting");
    setPercent(0);
    setConvertedImageUrl("");

    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setPercent(progress);

      if (progress >= 100) {
        clearInterval(interval);
        const fakeUrl = "https://placekitten.com/400/300";
        setConvertedUrl(fakeUrl);
        setConvertedImageUrl(fakeUrl);
        setStatus("success");
        setLoading(false);
      }
    }, 400);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 font-mono text-base text-green-300">
      <div
        {...getRootProps()}
        className={`relative w-full max-w-md cursor-pointer rounded-lg border-2 ${
          previewUrl ? "border-none p-0" : "border-dashed border-green-500 p-8"
        } bg-black text-center transition hover:bg-[#111]`}
      >
        <input {...getInputProps()} />
        {previewUrl && !convertedUrl ? (
          <div className="relative w-full max-w-md">
            {loading ? (
              <Skeleton height={300} width="100%" />
            ) : (
              <img
                src={previewUrl}
                alt="업로드된 이미지"
                className="h-auto max-h-[400px] w-full rounded object-contain"
              />
            )}
          </div>
        ) : !previewUrl ? (
          <div className="flex flex-col items-center justify-center text-green-500">
            <CloudUpload size={48} />
            <p className="mt-2">
              <strong className="text-green-300">Click</strong> or{" "}
              <strong className="text-green-300">Drag</strong> to upload image
            </p>
            <p className="mt-1 text-sm text-green-600">(max 10MB)</p>
          </div>
        ) : null}
      </div>

      {status === "idle" && previewUrl && !convertedUrl && (
        <>
          {loading ? <Skeleton height={280} width={400} /> : null}

          <div className="mt-2 flex gap-2">
            {formatOptions.map((f) => (
              <button
                key={f}
                className={`rounded border border-green-500 px-3 py-1 text-sm capitalize ${
                  format === f
                    ? "bg-green-600 text-black"
                    : "bg-black text-green-300 hover:bg-green-800 hover:text-white"
                }`}
                onClick={() => setFormat(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <Button className="mt-2" onClick={handleConvert} disabled={loading}>
            {loading ? "Converting..." : "Convert Image"}
          </Button>
        </>
      )}

      {convertedUrl && <ConvertedImagePreview imageUrl={convertedUrl} />}

      {status !== "idle" && (
        <>
          <ProgressBar percent={percent} />
          <StatusMessage status={status} />
          <Button className="mt-4" onClick={resetForm}>
            Reset Upload
          </Button>
        </>
      )}
    </div>
  );
}
