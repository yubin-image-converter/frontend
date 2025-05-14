import { AuthButton } from "@/features/auth";

export function Header() {
  return (
    <header className="flex w-full items-center justify-between border-b border-green-700 bg-black px-4 py-2 font-mono text-sm text-green-400">
      <div className="min-w-0 flex-1">
        <span className="block max-w-full truncate whitespace-nowrap text-left">
          ▌ Yubin Shin's Image-Converter ▌
        </span>
      </div>
      <div className="ml-4 flex-shrink-0 text-green-600">
        <AuthButton />
      </div>
    </header>
  );
}
