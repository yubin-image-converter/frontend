// // src/app/providers/SocketProvider.tsx
// import { ReactNode } from "react";

// import { useSocket } from "@/features/askii-convert/hooks/useSocket";
// import { getCurrentUser } from "@/shared/lib/userStore";

// export function SocketProvider({ children }: { children: ReactNode }) {
//   const userId = getCurrentUser()?.publicId ?? "";

//   // useSocket({
//   //   userId,
//   //   onAsciiComplete: (msg) => {
//   //     console.log("✅ ASCII complete from global socket:", msg);
//   //   },
//   // });

//   return <>{children}</>;
// }
