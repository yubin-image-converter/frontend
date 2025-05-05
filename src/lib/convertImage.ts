export async function convertImage(
  file: File,
  format: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("format", format);

  const response = await fetch("http://localhost:8080/api/convert", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("변환 실패");
  }

  const data = await response.json();
  return data.imageUrl;
}
