// import { useEffect, useState } from "react";
// import { Download } from "lucide-react";

// interface Props {
//   imageUrl: string; // txt 파일 URL
// }

// export function ConvertedImagePreview({ imageUrl }: Props) {
//   const [ascii, setAscii] = useState("Loading...");

//   useEffect(() => {
//     fetch(imageUrl)
//       .then((res) => res.text())
//       .then(setAscii)
//       .catch((err) => {
//         console.error("❌ Failed to load ASCII:", err);
//         setAscii("Error loading ASCII art.");
//       });
//   }, [imageUrl]);

//   const handleDownload = () => {
//     const link = document.createElement("a");
//     link.href = imageUrl;
//     link.download = "converted-ascii.txt";
//     link.click();
//   };

//   return (
//     <div className="flex flex-col items-center gap-4 font-mono text-green-300">
//       <div className="max-w-3xl overflow-auto rounded border border-green-700 bg-black p-4 shadow-md">
//         <pre className="text-xs leading-tight whitespace-pre">{ascii}</pre>
//       </div>

//       <button
//         onClick={handleDownload}
//         className="flex items-center gap-2 rounded border border-green-600 bg-black px-4 py-2 font-mono text-green-300 hover:bg-green-700 hover:text-white"
//       >
//         <Download size={14} />
//         Download
//       </button>
//     </div>
//   );
// }
import { useEffect, useState } from "react";

import axiosInstance from "@/shared/lib/axiosInstance";

interface Props {
  txtUrl: string | null;
}

export function ConvertedImagePreview({ txtUrl }: Props) {
  const [asciiContent, setAsciiContent] = useState<string>("");

  useEffect(() => {
    if (!txtUrl) return;

    axiosInstance
      .get(txtUrl, { responseType: "text" })
      .then((res) => setAsciiContent(res.data))
      .catch((err) => {
        console.error("❌ ASCII 파일 불러오기 실패:", err);
        setAsciiContent("불러오기 실패");
      });
  }, [txtUrl]);
  if (!txtUrl) {
    return <p className="text-gray-500">아직 변환 결과가 없습니다.</p>;
  }

  return (
    <div className="mt-4">
      <p className="font-semibold text-green-600">변환 완료!</p>
      <a
        href={txtUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        ASCII 파일 새 탭에서 열기
      </a>

      {asciiContent && (
        <pre className="mt-4 max-h-96 overflow-auto bg-black p-2 text-xs text-green-400">
          {asciiContent}
        </pre>
      )}
    </div>
  );
}
