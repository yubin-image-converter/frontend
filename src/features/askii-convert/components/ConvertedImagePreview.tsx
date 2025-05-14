import { useEffect, useState } from "react";

import axiosInstance from "@/shared/lib/axiosInstance";

interface Props {
  txtUrl: string;
}

export function ConvertedImagePreview({ txtUrl }: Props) {
  const [asciiContent, setAsciiContent] = useState<string>("Loading...");

  useEffect(() => {
    console.log("txtUrl:", txtUrl);
    if (!txtUrl || !txtUrl.startsWith("http")) {
      console.warn("❌ 잘못된 txtUrl:", txtUrl);
      return;
    }

    axiosInstance
      .get(txtUrl, { responseType: "text" })
      .then((res) => setAsciiContent(res.data))
      .catch((err) => {
        console.error("❌ ASCII 파일 불러오기 실패:", err);
        setAsciiContent("Error loading ASCII content.");
      });
  }, [txtUrl]);

  const handleDownload = async () => {
    try {
      const res = await axiosInstance.get(txtUrl, { responseType: "blob" });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "converted-ascii.txt");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error("❌ 다운로드 실패", err);
    }
  };

  return (
    <div className="w-full rounded border border-green-600 bg-black p-4 text-green-300 md:max-w-[768px]">
      <p className="mb-2 font-bold">ASCII Result:</p>
      <pre className="max-h-[500px] overflow-auto whitespace-pre rounded border border-green-700 bg-black p-2 font-mono text-[10px] leading-[0.7em] text-green-300 shadow-inner">
        {asciiContent}
      </pre>
      <button
        onClick={handleDownload}
        className="mt-4 w-full rounded border border-green-600 bg-black px-4 py-2 font-mono text-sm text-green-300 hover:bg-green-700 hover:text-white sm:w-auto"
      >
        Download ASCII
      </button>
    </div>
  );
}
