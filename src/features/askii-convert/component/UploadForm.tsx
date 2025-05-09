import { CloudUpload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Skeleton from "react-loading-skeleton";

import { Button } from "@/components/ui/button";
import { convertImage } from "@/shared/lib";

import { useAsciiSocket } from "../hooks/useAsciiSocket";
import { fetchAsciiResult } from "../services/convertApi";
import { ConvertedImagePreview } from "./ConvertedImagePreview";
import { ProgressBar } from "./ProgressBar";
import { StatusMessage } from "./StatusMessage";

const formatOptions = ["jpg", "png", "webp"] as const;
type Format = (typeof formatOptions)[number];

interface UploadFormProps {
  percent: number;
  status: "idle" | "converting" | "success" | "error";
  setPercent: (n: number) => void;
  setStatus: (status: "idle" | "converting" | "success" | "error") => void;
  setConvertedImageUrl: (url: string) => void;
  txtUrl: string | null;
}

export function UploadForm({
  percent,
  status,
  setPercent,
  setStatus,
  setConvertedImageUrl,
  txtUrl,
}: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState<Format>("jpg");
  const [requestId, setRequestId] = useState<string>(""); // 초기값 빈 문자열

  // ASCII 변환 완료 이벤트 수신
  useAsciiSocket({
    requestId,
    onComplete: (txtUrl) => {
      setConvertedUrl(txtUrl);
      setConvertedImageUrl(txtUrl);
      setStatus("success");
      setLoading(false);
      console.log("✅ ASCII 변환 완료! URL:", txtUrl);
    },
  });

  // 이미지 드롭 이벤트
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

  // 변환 요청 핸들러
  const handleConvert = async () => {
    if (!file) return;

    setLoading(true);
    setStatus("converting");
    setPercent(0);
    setConvertedImageUrl("");

    try {
      const { requestId } = await convertImage(file, format);
      setRequestId(requestId); // WebSocket 응답 대기
    } catch (err) {
      setStatus("error");
      console.error(err);
    }
  };

  useEffect(() => {
    if (!requestId) return;

    fetchAsciiResult(requestId).then((url) => {
      if (url) setTxtUrl(url);
    });
  }, [requestId]);

  const resetForm = () => {
    setFile(null);
    setPreviewUrl(null);
    setConvertedUrl(null);
    setRequestId("");
    setStatus("idle");
    setPercent(0);
  };

  return (
    <div className="flex w-full flex-col items-center gap-4 font-mono text-base text-green-300">
      {/* 업로드 박스 */}
      <div
        {...getRootProps()}
        className={`relative w-full max-w-md cursor-pointer rounded border-2 ${
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
              <span className="font-bold text-green-300">Click</span> or{" "}
              <span className="font-bold text-green-300">Drag</span> to upload
              image
            </p>
            <p className="mt-1 text-sm text-green-600">(max 10MB)</p>
          </div>
        ) : null}
      </div>

      {/* 형식 선택 */}
      {status === "idle" && previewUrl && !convertedUrl && (
        <>
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

          <Button
            className="mt-2 bg-green-500 text-black hover:bg-green-400"
            onClick={handleConvert}
            disabled={loading}
          >
            {loading ? "Converting..." : "Convert Image"}
          </Button>
        </>
      )}

      {/* ASCII 변환 결과 */}
      {convertedUrl && <ConvertedImagePreview txtUrl={txtUrl} />}

      {/* 진행률 / 상태 메시지 */}
      {status !== "idle" && (
        <>
          <ProgressBar percent={percent} />
          <StatusMessage status={status} />
          <Button
            className="flex items-center gap-2 rounded border border-green-600 bg-black px-4 py-2 font-mono text-green-300 hover:bg-green-700 hover:text-white"
            onClick={resetForm}
          >
            Reset Upload
          </Button>
        </>
      )}
    </div>
  );
}
