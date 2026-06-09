const REPORT_STORAGE_KEY = "metadata_similarity_reports";

function safeParseJson(value, fallback) {
  try {
    const parsed = JSON.parse(value);

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return fallback;
    }

    return parsed;
  } catch {
    return fallback;
  }
}

function normalizeKey(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function getAllReports() {
  if (typeof window === "undefined") return {};

  const raw = window.localStorage.getItem(REPORT_STORAGE_KEY);

  if (!raw || raw === "null" || raw === "undefined") {
    return {};
  }

  return safeParseJson(raw, {});
}

function setAllReports(reports) {
  if (typeof window === "undefined") return;

  const safeReports =
    reports && typeof reports === "object" && !Array.isArray(reports)
      ? reports
      : {};

  window.localStorage.setItem(REPORT_STORAGE_KEY, JSON.stringify(safeReports));
}

export function clearReportStorage() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(REPORT_STORAGE_KEY);
}

export function saveReportToLocalStorage({
  metadataId,
  checkId,
  title,
  imageUrl,
  report,
}) {
  if (!report) return;

  const reports = getAllReports();

  const safeMetadataId =
    metadataId !== undefined && metadataId !== null && metadataId !== ""
      ? String(metadataId)
      : "";

  const safeCheckId =
    checkId ||
    report.check_id ||
    report.checkId ||
    report.checkID ||
    "";

  const safeTitle =
    title ||
    report.title ||
    report.metadata?.title ||
    report.metadata?.["Judul KI"] ||
    "";

  const safeImageUrl =
    imageUrl ||
    report.image_url ||
    report.imageUrl ||
    report.uploaded_image_url ||
    report.uploadedImageUrl ||
    "";

  const payload = {
    metadata_id: safeMetadataId || null,
    check_id: safeCheckId || null,
    title: safeTitle || "",
    image_url: safeImageUrl || "",
    report,
    saved_at: new Date().toISOString(),
  };

  if (safeMetadataId) {
    reports[`metadata:${safeMetadataId}`] = payload;
  }

  if (safeCheckId) {
    reports[`check:${safeCheckId}`] = payload;
  }

  if (safeTitle) {
    reports[`title:${normalizeKey(safeTitle)}`] = payload;
  }

  if (safeImageUrl) {
    reports[`image:${safeImageUrl}`] = payload;
  }

  setAllReports(reports);
}

export function findStoredReportByMetadata(data) {
  if (!data) return null;

  const reports = getAllReports();

  const metadataId =
    data._id ||
    data.id ||
    data.metadata_id ||
    data.metadataId ||
    "";

  const checkId =
    data.check_id ||
    data.checkId ||
    data.checkID ||
    "";

  const title =
    data["Judul KI"] ||
    data.title ||
    data.judul ||
    data.judul_ki ||
    "";

  const imageUrl =
    data.image_url ||
    data.imageUrl ||
    data.image ||
    data.gambar ||
    "";

  const safeMetadataId =
    metadataId !== undefined && metadataId !== null && metadataId !== ""
      ? String(metadataId)
      : "";

  const safeCheckId =
    checkId !== undefined && checkId !== null && checkId !== ""
      ? String(checkId)
      : "";

  if (safeMetadataId && reports[`metadata:${safeMetadataId}`]) {
    return reports[`metadata:${safeMetadataId}`];
  }

  if (safeCheckId && reports[`check:${safeCheckId}`]) {
    return reports[`check:${safeCheckId}`];
  }

  if (title && reports[`title:${normalizeKey(title)}`]) {
    return reports[`title:${normalizeKey(title)}`];
  }

  if (imageUrl && reports[`image:${imageUrl}`]) {
    return reports[`image:${imageUrl}`];
  }

  return null;
}