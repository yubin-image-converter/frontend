import { AuthButton } from "./auth/AuthButton";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-green-700 bg-black px-4 py-2 font-mono text-sm text-green-400">
      <span className="tracking-wide">▌ Yubin Shin's Image-Converter ▌</span>
      <div className="text-green-600">
        <AuthButton />
      </div>
    </header>
  );
}
