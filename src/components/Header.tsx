import { AuthButton } from "./auth/AuthButton";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-gray-700 px-4 py-3 text-sm text-gray-300">
      <span className="text-xs">⛓️ Yubin Shin's Image-converter</span>
      <AuthButton />
    </header>
  );
}
