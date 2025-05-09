// src/features/askii-convert/services/fetchResult.ts
import axiosInstance from "@/shared/lib/axiosInstance";

export async function fetchConvertResult(requestId: string) {
  const res = await axiosInstance.get(`/converts/result`, {
    params: { requestId },
  });

  return res.data; // { txtUrl: string }
}
