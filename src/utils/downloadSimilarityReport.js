function toPercent(value) {
  if (value === undefined || value === null || value === "") return "-";
  const number = Number(value);
  if (Number.isNaN(number)) return "-";
  return Number((number <= 1 ? number * 100 : number).toFixed(2));
}

function safe(value) {
  return value === undefined || value === null || value === "" ? "-" : value;
}

function safeFileName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function matchValue(item, metadataKey, itemKey = metadataKey) {
  return item?.metadata?.[metadataKey] || item?.[itemKey] || "-";
}

function matchTitle(item) {
  return (
    item?.metadata?.title ||
    item?.metadata?.["Judul KI"] ||
    item?.title ||
    item?.judul ||
    "Tanpa judul"
  );
}

function imageUrl(item) {
  return (
    item?.metadata?.image_url ||
    item?.metadata?.imageUrl ||
    item?.image_url ||
    item?.imageUrl ||
    "-"
  );
}

function sourceUrl(item) {
  return item?.source_url || item?.sourceUrl || imageUrl(item);
}

function createSheet(XLSX, rows, widths) {
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  sheet["!cols"] = widths.map((width) => ({ wch: width }));
  return sheet;
}

function summaryRows(result, resultPercent, threshold) {
  const similarity = result?.similarity_result || {};
  const summary = similarity.summary || {};
  const decision = result?.decision_result?.decision || {};
  const best = similarity.best_match || {};

  return [
    ["SIMILARITY REPORT"],
    ["Tanggal Download", new Date().toLocaleString("id-ID")],
    [],
    ["RINGKASAN HASIL"],
    ["Check ID", safe(result?.check_id)],
    ["Status Proses", safe(result?.status)],
    ["Dapat Register", result?.can_register ? "Ya" : "Tidak"],
    ["Status Registrasi", safe(result?.registration_status)],
    ["Alasan Registrasi", safe(result?.registration_reason)],
    ["Skor Kemiripan (%)", safe(resultPercent)],
    ["Threshold (%)", safe(threshold)],
    ["Best Source", safe(similarity.best_source)],
    ["Best Internal Score (%)", toPercent(summary.best_internal_score)],
    ["Best External Score (%)", toPercent(summary.best_external_score)],
    ["Total Internal", safe(summary.internal_total)],
    ["Total External", safe(summary.external_total)],
    ["Total Combined", safe(summary.combined_total)],
    [],
    ["KEPUTUSAN SISTEM"],
    ["Decision Status", safe(decision.status)],
    ["Risk Level", safe(decision.risk_level)],
    ["Requires Review", decision.requires_review ? "Ya" : "Tidak"],
    ["Decision Reason", safe(decision.reason)],
    [],
    ["BEST MATCH"],
    ["Sumber", safe(best.source)],
    ["Judul", matchTitle(best)],
    ["Skor Akhir (%)", toPercent(best.final_score)],
    ["Konteks Visual / CLIP (%)", toPercent(best.clip_score)],
    ["Detail Visual / CNN (%)", toPercent(best.cnn_score)],
    ["Image URL", imageUrl(best)],
    ["Source URL", sourceUrl(best)],
  ];
}

function matchRows(title, items) {
  const rows = [
    [title],
    [],
    [
      "Peringkat",
      "Sumber",
      "Judul",
      "Deskripsi",
      "Kategori",
      "Sub Kategori",
      "Kategori HC",
      "Sub Kategori HC",
      "Skor Akhir (%)",
      "Konteks Visual / CLIP (%)",
      "Detail Visual / CNN (%)",
      "Image URL",
      "Source URL",
    ],
  ];

  if (!items.length) {
    rows.push(["-", "-", "Tidak ada hasil", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"]);
    return rows;
  }

  items.forEach((item, index) => {
    rows.push([
      index + 1,
      safe(item.source),
      matchTitle(item),
      matchValue(item, "description"),
      matchValue(item, "category"),
      matchValue(item, "sub_category"),
      matchValue(item, "copyright_category"),
      matchValue(item, "copyright_sub_category"),
      toPercent(item.final_score),
      toPercent(item.clip_score),
      toPercent(item.cnn_score),
      imageUrl(item),
      sourceUrl(item),
    ]);
  });

  return rows;
}

function webSearchRows(result) {
  const webSearch = result?.web_search_result || {};
  const rows = [
    ["WEB SEARCH RESULT"],
    [],
    ["Found On Web", webSearch.found_on_web ? "Ya" : "Tidak"],
    [],
    ["No", "Judul", "Image URL", "Source URL"],
  ];

  if (!webSearch.matches?.length) {
    rows.push(["-", "Tidak ada hasil", "-", "-"]);
    return rows;
  }

  webSearch.matches.forEach((item, index) => {
    rows.push([
      index + 1,
      safe(item.title),
      safe(item.image_url),
      safe(item.source_url),
    ]);
  });

  return rows;
}

export async function downloadSimilarityReport({
  result,
  resultPercent,
  threshold,
  fileName,
}) {
  if (!result) return;

  const XLSX = await import("xlsx");
  const similarity = result.similarity_result || {};
  const groups = similarity.results || {};
  const percent = resultPercent ?? toPercent(similarity.overall_score);
  const reportThreshold =
    threshold ?? result.threshold ?? similarity.threshold;
  const workbook = XLSX.utils.book_new();
  const matchWidths = [10, 14, 38, 35, 18, 20, 18, 22, 16, 24, 24, 70, 90];

  XLSX.utils.book_append_sheet(
    workbook,
    createSheet(XLSX, summaryRows(result, percent, reportThreshold), [28, 90]),
    "Summary"
  );
  XLSX.utils.book_append_sheet(
    workbook,
    createSheet(XLSX, matchRows("TOP 3 INTERNAL", groups.internal_top3 || []), matchWidths),
    "Internal Top 3"
  );
  XLSX.utils.book_append_sheet(
    workbook,
    createSheet(XLSX, matchRows("TOP 3 EXTERNAL", groups.external_top3 || []), matchWidths),
    "External Top 3"
  );
  XLSX.utils.book_append_sheet(
    workbook,
    createSheet(XLSX, matchRows("COMBINED TOP 3", groups.combined_top3 || []), matchWidths),
    "Combined Top 3"
  );
  XLSX.utils.book_append_sheet(
    workbook,
    createSheet(XLSX, webSearchRows(result), [10, 45, 80, 90]),
    "Web Search"
  );

  const suffix =
    safeFileName(fileName) ||
    safeFileName(result.check_id) ||
    new Date().toISOString().replaceAll(":", "-").slice(0, 19);

  XLSX.writeFile(workbook, `similarity-report-${suffix}.xlsx`);
}
