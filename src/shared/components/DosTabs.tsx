// import { UploadForm } from "@/features/askii-convert/components/UploadForm";
// import { WorkerPanel } from "@/features/askii-convert/components/WorkerPanel";

// import { DosPanel } from "./DosPanel";

// interface DosTabsProps {
//   percent: number;
//   status: "idle" | "converting" | "success" | "error";
//   setPercent: (n: number) => void;
//   setStatus: (status: "idle" | "converting" | "success" | "error") => void;
//   setConvertedImageUrl: (url: string) => void;
//   txtUrl: string | null;
// }

// export function DosTabs({
//   percent,
//   status,
//   setPercent,
//   setStatus,
//   setConvertedImageUrl,
//   txtUrl,
// }: DosTabsProps) {
//   return (
//     <div className="flex flex-col gap-6 md:flex-row md:items-stretch">
//       <div className="flex-[3]">
//         <DosPanel title="UPLOAD FORM" className="min-h-[400px]">
//           <UploadForm
//             percent={percent}
//             status={status}
//             setPercent={setPercent}
//             setStatus={setStatus}
//             setConvertedImageUrl={setConvertedImageUrl}
//             txtUrl={txtUrl}
//           />
//         </DosPanel>
//       </div>

//       <div className="flex-[2]">
//         <DosPanel title="WORKER STATUS" className="min-h-[400px]">
//           <WorkerPanel />
//         </DosPanel>
//       </div>
//     </div>
//   );
// }
