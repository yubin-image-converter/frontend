import axiosInstance from "./axiosInstance";

export async function convertApi(
  file: File,
  format: string,
): Promise<{ requestId: string; userId: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("format", format);

  const response = await axiosInstance.post("/converts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return {
    requestId: response.data.requestId,
    userId: response.data.userId,
  };
}
