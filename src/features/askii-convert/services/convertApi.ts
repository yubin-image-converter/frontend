import axios from "axios";

import axiosInstance from "@/shared/lib/axiosInstance";

export async function fetchAsciiResult(
  requestId: string,
): Promise<string | null> {
  try {
    const res = await axiosInstance.get("/converts/result", {
      params: { requestId },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data.txtUrl;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("❌ ASCII 결과 요청 실패:", {
        status: err.response?.status,
        data: err.response?.data,
      });
    } else {
      console.error("❌ 알 수 없는 에러:", err);
    }
    return null;
  }
}
