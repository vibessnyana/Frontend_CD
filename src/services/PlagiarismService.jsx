const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function checkPlagiarism({ file, preset, thresholds }) {
  const formData = new FormData();

  formData.append("file", file);

  if (preset) {
    formData.append("preset", preset);
  }

  if (thresholds) {
    formData.append("high_threshold", thresholds.high);
    formData.append("medium_threshold", thresholds.medium);
    formData.append("low_threshold", thresholds.low);
  }

  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });


  if (!response.ok) {
    const error = await response.json().catch(() => null);
    throw new Error(error?.detail || "Gagal mengecek plagiarisme");
  }

  return response.json();
}
