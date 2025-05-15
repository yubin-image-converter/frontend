import { useEffect, useState } from "react";

import { useSocketContext } from "@/shared/hooks/useSocketContext";

export function WorkerPanel() {
  const { socket } = useSocketContext();
  const [statusMap, setStatusMap] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!socket) return;

    const handleStatus = (data: Record<string, string>) => {
      setStatusMap(data);
    };

    socket.on("worker_status", handleStatus);

    return () => {
      socket.off("worker_status", handleStatus);
    };
  }, [socket]);

  return (
    <div className="w-full max-w-full rounded border border-green-700 p-4 text-sm text-green-300">
      <div className="mb-2 font-bold">Active Workers</div>
      {Object.keys(statusMap).length === 0 ? (
        <div className="text-green-600">No active workers.</div>
      ) : (
        <ul className="space-y-1">
          {Object.entries(statusMap).map(([id, status]) => (
            <li key={id} className="flex items-center justify-between">
              <span>{id}</span>
              <span
                className={
                  status === "connected" ? "text-green-400" : "text-red-400"
                }
              >
                {status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
