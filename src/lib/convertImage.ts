import axiosInstance from "@/lib/axiosInstance";

export async function convertImage(
  file: File,
  format: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("format", format);

  const response = await axiosInstance.post("/converts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true, // 쿠키 사용
  });

  return response.data.imageUrl;
}
