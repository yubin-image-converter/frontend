import "react-loading-skeleton/dist/skeleton.css";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Skeleton from "react-loading-skeleton";

import { ConvertedImagePreview } from "@/components/ConvertedImagePreview";
import { Button } from "@/components/ui/button";
import { convertImage } from "@/utils/convertImage";

const formatOptions = ["jpg", "png", "webp"] as const;
type Format = (typeof formatOptions)[number];

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [convertedUrl, setConvertedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState<Format>("jpg");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (!selected) return;
    setFile(selected);
    setConvertedUrl(null);
    setPreviewUrl(URL.createObjectURL(selected));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
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
    try {
      const url = await convertImage(file, format); // format도 전달
      setConvertedUrl(url);
    } catch (e) {
      alert("이미지 변환 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center gap-4">
      <div
        {...getRootProps()}
        className="w-full cursor-pointer rounded-lg border-2 border-dashed p-8 text-center hover:bg-muted"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>파일을 여기로 드래그하세요</p>
        ) : (
          <p>클릭하거나 드래그해서 이미지 업로드</p>
        )}
      </div>

      {previewUrl && !convertedUrl && (
        <>
          {loading ? (
            <Skeleton height={280} width={400} />
          ) : (
            <img
              src={previewUrl}
              alt="미리보기"
              className="w-full max-w-md rounded shadow"
            />
          )}

          <div className="mt-2 flex gap-2">
            {formatOptions.map((f) => (
              <button
                key={f}
                className={`rounded border px-3 py-1 text-sm capitalize ${
                  format === f
                    ? "bg-primary text-white"
                    : "bg-muted text-foreground"
                }`}
                onClick={() => setFormat(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <Button
            className="mt-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={handleConvert}
            disabled={loading}
          >
            {loading ? "변환 중..." : "변환 요청"}
          </Button>
        </>
      )}

      {convertedUrl && <ConvertedImagePreview imageUrl={convertedUrl} />}
    </div>
  );
}
