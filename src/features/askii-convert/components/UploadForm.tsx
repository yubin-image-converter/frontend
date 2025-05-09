// src/features/askii-convert/components/UploadForm.tsx
import { CloudUpload } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";

const formatOptions = ["jpg", "png", "webp"] as const;
export type Format = (typeof formatOptions)[number];

interface UploadFormProps {
  onConvert: (file: File, format: Format) => void;
  disabled?: boolean;
}

export function UploadForm({ onConvert, disabled }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [format, setFormat] = useState<Format>("jpg");

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selected = acceptedFiles[0];
    if (!selected) return;
    setFile(selected);
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

  return (
    <div className="flex flex-col items-center gap-4">
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
          <>
            <CloudUpload size={48} />
            <p className="mt-2">Click or drag to upload</p>
          </>
        )}
      </div>

      {file && (
        <>
          <div className="flex gap-2">
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
            disabled={disabled}
            className="bg-green-500 text-black hover:bg-green-400"
            onClick={() => file && onConvert(file, format)}
          >
            Convert Image
          </Button>
        </>
      )}
    </div>
  );
}
