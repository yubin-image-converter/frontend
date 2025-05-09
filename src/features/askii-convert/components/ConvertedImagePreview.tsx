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
    <div className="w-full max-w-md rounded border border-green-600 bg-black p-4 text-green-300">
      <p className="mb-2 font-bold">ASCII Result:</p>
      <pre className="max-h-[500px] overflow-auto whitespace-pre rounded border border-green-700 bg-black p-2 font-mono text-[10px] leading-[0.7em] text-green-300 shadow-inner">
        {asciiContent}
      </pre>
    </div>
  );
}
