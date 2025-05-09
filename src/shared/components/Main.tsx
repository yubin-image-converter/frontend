// src/shared/components/Main.tsx

import { ConvertContainer } from "@/features/askii-convert/container/ConvertContainer";

export function Main() {
  return (
    <main className="flex flex-1 items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <ConvertContainer />
      </div>
    </main>
  );
}
