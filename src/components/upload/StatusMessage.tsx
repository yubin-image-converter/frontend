interface StatusMessageProps {
  status: "idle" | "converting" | "success" | "error";
}

export function StatusMessage({ status }: StatusMessageProps) {
  const message = {
    idle: "대기 중",
    converting: "변환 중입니다...",
    success: "변환 완료!",
    error: "변환 실패...",
  }[status];

  const color = {
    idle: "text-gray-500",
    converting: "text-blue-500",
    success: "text-green-500",
    error: "text-red-500",
  }[status];

  return <p className={`mt-2 font-semibold ${color}`}>{message}</p>;
}
