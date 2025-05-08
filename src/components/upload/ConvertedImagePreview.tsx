// src/components/ConvertedImagePreview.tsx

import { Download } from "lucide-react";

interface Props {
  imageUrl: string;
}

export function ConvertedImagePreview({ imageUrl }: Props) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "converted-image.png";
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 font-mono text-green-300">
      <div className="max-w-md border border-green-700 p-2">
        <img
          src={imageUrl}
          alt="Converted image"
          className="max-h-[300px] w-full bg-black object-contain"
        />
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 rounded border border-green-600 bg-black px-4 py-2 font-mono text-green-300 hover:bg-green-700 hover:text-white"
      >
        <Download size={14} />
        Download
      </button>
    </div>
  );
}
