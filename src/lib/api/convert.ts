import axiosInstance from "@/lib/axiosInstance";

export async function fetchAsciiResult(
  requestId: string,
): Promise<string | null> {
  try {
    const res = await axiosInstance.get("/converts/result", {
      params: { requestId },
    });
    return res.data.txtUrl;
  } catch (err) {
    console.error("❌ ASCII 결과 요청 실패", err);
    return null;
  }
}
