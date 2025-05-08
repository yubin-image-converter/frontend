import { AuthButton } from "./auth/AuthButton";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-700 px-4 py-3 text-sm text-gray-300">
      <span className="text-xs">⛓️ 유빈이의 이미지 변환기</span>
      <AuthButton />
    </header>
  );
}
