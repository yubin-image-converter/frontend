import { useEffect, useState } from "react";

import axiosInstance from "@/shared/lib/axiosInstance";

interface Props {
  txtUrl: string;
}

export function ConvertedImagePreview({ txtUrl }: Props) {
  const [asciiContent, setAsciiContent] = useState<string>("Loading...");

  useEffect(() => {
    console.log("txtUrl:", txtUrl); // undefined, null, 잘못된 값 확인
    if (!txtUrl || !txtUrl.startsWith("http")) {
      console.warn("❌ 잘못된 txtUrl:", txtUrl);
      return;
    }

    axiosInstance
      .get(txtUrl, { responseType: "text" }) // <- responseType 명시!
      .then((res) => setAsciiContent(res.data))
      .catch((err) => {
        console.error("❌ ASCII 파일 불러오기 실패:", err);
        setAsciiContent("Error loading ASCII content.");
      });
  }, [txtUrl]);

  return (
    <div className="w-full flex-1 rounded border border-green-600 bg-black p-4 text-green-300 md:max-w-3xl">
      <p className="mb-2 font-bold">ASCII Result:</p>
      <pre className="max-h-[500px] overflow-auto whitespace-pre rounded border border-green-700 bg-black p-2 font-mono text-[10px] leading-[0.7em] text-green-300 shadow-inner">
        {asciiContent}
      </pre>
      <a
        href={txtUrl}
        download="converted-ascii.txt"
        className="mt-4 inline-block rounded border border-green-600 bg-black px-4 py-2 font-mono text-sm text-green-300 hover:bg-green-700 hover:text-white"
      >
        Download ASCII
      </a>
    </div>
  );
}
