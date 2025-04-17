// src/components/ConvertedImagePreview.tsx

interface Props {
  imageUrl: string;
}

export function ConvertedImagePreview({ imageUrl }: Props) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "converted-image.png"; // 혹은 동적으로 확장자 지정
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        src={imageUrl}
        alt="변환된 이미지"
        className="w-full max-w-md rounded shadow"
      />
      <button
        className="bg-green-600 hover:bg-green-700 rounded px-4 py-2 text-white"
        onClick={handleDownload}
      >
        다운로드
      </button>
    </div>
  );
}
