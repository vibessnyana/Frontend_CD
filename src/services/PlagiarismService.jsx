const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function getErrorMessage(error, fallback, status) {
  if (status >= 500) {
    return "Layanan sedang bermasalah. Silakan coba beberapa saat lagi.";
  }

  if (!error) return fallback;
  if (typeof error.detail === "string") return error.detail;
  if (error.detail?.message) return error.detail.message;
  if (error.message) return error.message;
  return fallback;
}

async function throwRequestError(response, fallback) {
  const error = await response.json().catch(() => null);
  throw new Error(getErrorMessage(error, fallback, response.status));
}

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
    await throwRequestError(response, "Gagal mengecek plagiarisme");
  }

  return response.json();
}

export async function registerMetadata(payload) {
  const response = await fetch(`${API_BASE_URL}/register-metadata`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    await throwRequestError(response, "Gagal menyimpan metadata");
  }

  return response.json();
}
export async function approveReviewCheck(checkId, reason = "Disetujui reviewer") {
  const response = await fetch(`${API_BASE_URL}/review-check/${checkId}/approve`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });

  if (!response.ok) {
    await throwRequestError(response, "Gagal menyetujui hasil review");
  }

  return response.json();
}

export async function rejectReviewCheck(checkId, reason = "Ditolak reviewer") {
  const response = await fetch(`${API_BASE_URL}/review-check/${checkId}/reject`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reason }),
  });

  if (!response.ok) {
    await throwRequestError(response, "Gagal menolak hasil review");
  }

  return response.json();
}
