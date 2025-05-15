import { Provider as JotaiProvider } from "jotai";
import { ReactNode } from "react";

export function JotaiStateProvider({ children }: { children: ReactNode }) {
  return <JotaiProvider>{children}</JotaiProvider>;
}
