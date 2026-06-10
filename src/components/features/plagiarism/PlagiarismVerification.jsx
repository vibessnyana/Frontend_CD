import { useState } from "react";

import ButtonCancel from "../../ui/Button/ButtonCancel.jsx";
import ButtonAction from "../../ui/Button/ButtonAction.jsx";
import ButtonDownloadReport from "../../ui/Button/ButtonDownloadReport.jsx";
import SimilarityList from "./SimilarityList.jsx";
import SimilarityDetailModal from "./SimilarityDetailModal.jsx";
import { downloadSimilarityReport } from "../../../utils/downloadSimilarityReport.js";

function mapSimilarityItem(item) {
  const metadata = item.metadata || {};
  const isInternal = item.source === "internal";

  return {
    img: metadata.image_url || item.image_url,
    percent: Number(((item.final_score || 0) * 100).toFixed(2)),
    title: metadata.title || item.title,
    owner: isInternal ? "Sumber: internal" : item.source_url || item.owner,
    sourceUrl: item.source_url || metadata.image_url,
    sourceType: item.source,
    raw: item,
  };
}


function getScoreColor(riskLevel) {
  switch (riskLevel) {
    case "high":
      return "text-red-600";
    case "medium":
      return "text-orange-500";
    case "low":
      return "text-yellow-600";
    case "very_low":
      return "text-green-600";
    default:
      return "text-gray-700";
  }
}

function getRiskBadgeClass(riskLevel) {
  switch (riskLevel) {
    case "high":
      return "bg-red-50 text-red-700";
    case "medium":
      return "bg-orange-50 text-orange-700";
    case "low":
      return "bg-yellow-50 text-yellow-700";
    case "very_low":
      return "bg-green-50 text-green-700";
    default:
      return "bg-white text-gray-600";
  }
}

/*
 * Report generation now lives in utils/downloadSimilarityReport.js.
 * This legacy block is retained temporarily to keep this refactor scoped.
function toPercent(value) {
  if (value === undefined || value === null || value === "") return "-";

  const number = Number(value);

  if (Number.isNaN(number)) return "-";

  return Number((number <= 1 ? number * 100 : number).toFixed(2));
}

function getSafeValue(value) {
  if (value === undefined || value === null || value === "") return "-";
  return value;
}

function getSafeFileName(value) {
  return String(value || "similarity-report")
    .toLowerCase()
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getDownloadDateName() {
  const now = new Date();

  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 8).replaceAll(":", "-");

  return `${date}-${time}`;
}

function getMatchTitle(item) {
  return (
    item?.metadata?.title ||
    item?.metadata?.["Judul KI"] ||
    item?.title ||
    item?.judul ||
    "Tanpa judul"
  );
}

function getMatchDescription(item) {
  return item?.metadata?.description || item?.description || "-";
}

function getMatchCategory(item) {
  return item?.metadata?.category || item?.category || "-";
}

function getMatchSubCategory(item) {
  return item?.metadata?.sub_category || item?.sub_category || "-";
}

function getMatchCopyrightCategory(item) {
  return (
    item?.metadata?.copyright_category ||
    item?.copyright_category ||
    "-"
  );
}

function getMatchCopyrightSubCategory(item) {
  return (
    item?.metadata?.copyright_sub_category ||
    item?.copyright_sub_category ||
    "-"
  );
}

function getMatchImageUrl(item) {
  return (
    item?.metadata?.image_url ||
    item?.metadata?.imageUrl ||
    item?.image_url ||
    item?.imageUrl ||
    "-"
  );
}

function getMatchSourceUrl(item) {
  return (
    item?.source_url ||
    item?.sourceUrl ||
    item?.metadata?.image_url ||
    item?.metadata?.imageUrl ||
    item?.image_url ||
    item?.imageUrl ||
    "-"
  );
}

function createSheet(data, columnWidths = []) {
  const sheet = XLSX.utils.aoa_to_sheet(data);

  if (columnWidths.length > 0) {
    sheet["!cols"] = columnWidths.map((width) => ({ wch: width }));
  }

  return sheet;
}

function buildSummarySheetData({
  result,
  resultPercent,
  threshold,
  similarityResult,
  decision,
}) {
  const summary = similarityResult?.summary || {};
  const bestMatch = similarityResult?.best_match || {};

  return [
    ["SIMILARITY REPORT"],
    ["Tanggal Download", new Date().toLocaleString("id-ID")],
    [],
    ["RINGKASAN HASIL"],
    ["Check ID", getSafeValue(result?.check_id)],
    ["Status Proses", getSafeValue(result?.status)],
    ["Dapat Register", result?.can_register ? "Ya" : "Tidak"],
    ["Status Registrasi", getSafeValue(result?.registration_status)],
    ["Alasan Registrasi", getSafeValue(result?.registration_reason)],
    ["Skor Kemiripan (%)", getSafeValue(resultPercent)],
    ["Threshold (%)", getSafeValue(threshold)],
    ["Best Source", getSafeValue(similarityResult?.best_source)],
    ["Best Internal Score (%)", toPercent(summary.best_internal_score)],
    ["Best External Score (%)", toPercent(summary.best_external_score)],
    ["Total Internal", getSafeValue(summary.internal_total)],
    ["Total External", getSafeValue(summary.external_total)],
    ["Total Combined", getSafeValue(summary.combined_total)],
    [],
    ["KEPUTUSAN SISTEM"],
    ["Decision Status", getSafeValue(decision?.status)],
    ["Risk Level", getSafeValue(decision?.risk_level)],
    ["Requires Review", decision?.requires_review ? "Ya" : "Tidak"],
    ["Decision Reason", getSafeValue(decision?.reason)],
    [],
    ["BEST MATCH"],
    ["Sumber", getSafeValue(bestMatch.source)],
    ["Judul", getMatchTitle(bestMatch)],
    ["Skor Akhir (%)", toPercent(bestMatch.final_score)],
    ["Konteks Visual / CLIP (%)", toPercent(bestMatch.clip_score)],
    ["Detail Visual / CNN (%)", toPercent(bestMatch.cnn_score)],
    ["Image URL", getMatchImageUrl(bestMatch)],
    ["Source URL", getMatchSourceUrl(bestMatch)],
  ];
}

function buildMatchSheetData(title, items) {
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
    rows.push([
      "-",
      "-",
      "Tidak ada hasil",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
      "-",
    ]);

    return rows;
  }

  items.forEach((item, index) => {
    rows.push([
      index + 1,
      getSafeValue(item.source),
      getMatchTitle(item),
      getMatchDescription(item),
      getMatchCategory(item),
      getMatchSubCategory(item),
      getMatchCopyrightCategory(item),
      getMatchCopyrightSubCategory(item),
      toPercent(item.final_score),
      toPercent(item.clip_score),
      toPercent(item.cnn_score),
      getMatchImageUrl(item),
      getMatchSourceUrl(item),
    ]);
  });

  return rows;
}

function buildWebSearchSheetData(result) {
  const matches = result?.web_search_result?.matches || [];

  const rows = [
    ["WEB SEARCH RESULT"],
    [],
    ["Found On Web", result?.web_search_result?.found_on_web ? "Ya" : "Tidak"],
    [],
    ["No", "Judul", "Image URL", "Source URL"],
  ];

  if (!matches.length) {
    rows.push(["-", "Tidak ada hasil", "-", "-"]);
    return rows;
  }

  matches.forEach((item, index) => {
    rows.push([
      index + 1,
      getSafeValue(item.title),
      getSafeValue(item.image_url),
      getSafeValue(item.source_url),
    ]);
  });

  return rows;
}

function downloadExcelReport({
  result,
  resultPercent,
  threshold,
  uploadedFileName,
}) {
  const similarityResult = result?.similarity_result || {};
  const decision = result?.decision_result?.decision || {};
  const internalTop3 = similarityResult?.results?.internal_top3 || [];
  const externalTop3 = similarityResult?.results?.external_top3 || [];
  const combinedTop3 = similarityResult?.results?.combined_top3 || [];

  const workbook = XLSX.utils.book_new();

  const summarySheet = createSheet(
    buildSummarySheetData({
      result,
      resultPercent,
      threshold,
      similarityResult,
      decision,
    }),
    [28, 90]
  );

  const internalSheet = createSheet(
    buildMatchSheetData("TOP 3 INTERNAL", internalTop3),
    [10, 14, 28, 35, 18, 20, 18, 22, 16, 24, 24, 70, 90]
  );

  const externalSheet = createSheet(
    buildMatchSheetData("TOP 3 EXTERNAL", externalTop3),
    [10, 14, 38, 35, 18, 20, 18, 22, 16, 24, 24, 70, 90]
  );

  const combinedSheet = createSheet(
    buildMatchSheetData("COMBINED TOP 3", combinedTop3),
    [10, 14, 38, 35, 18, 20, 18, 22, 16, 24, 24, 70, 90]
  );

  const webSearchSheet = createSheet(
    buildWebSearchSheetData(result),
    [10, 45, 80, 90]
  );

  XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
  XLSX.utils.book_append_sheet(workbook, internalSheet, "Internal Top 3");
  XLSX.utils.book_append_sheet(workbook, externalSheet, "External Top 3");
  XLSX.utils.book_append_sheet(workbook, combinedSheet, "Combined Top 3");
  XLSX.utils.book_append_sheet(workbook, webSearchSheet, "Web Search");

  const safeTitle = getSafeFileName(uploadedFileName);
  const safeCheckId = getSafeFileName(result?.check_id);

  const downloadFileName = safeTitle
    ? `similarity-report-${safeTitle}.xlsx`
    : safeCheckId
    ? `similarity-report-${safeCheckId}.xlsx`
    : `similarity-report-${getDownloadDateName()}.xlsx`;

  XLSX.writeFile(workbook, downloadFileName);
}
*/

export default function PlagiarismVerification({
  preview,
  fileName,
  resultPercent,
  threshold,
  result,
  onVerify,
  onCancel,
  onApproveReview,
  onRejectReview,
}) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const similarityResult = result?.similarity_result;
  const decision = result?.decision_result?.decision;
  const canRegister = Boolean(result?.can_register);
  const registrationStatus = result?.registration_status;
  const normalizedRegistrationStatus = String(
    registrationStatus || ""
  ).toLowerCase();

  const registrationReason = result?.registration_reason;
  const riskLevel = decision?.risk_level || "unknown";
  const normalizedRiskLevel = String(riskLevel).toLowerCase();
  const requiresReview = Boolean(decision?.requires_review);
  const needsReview =
    normalizedRegistrationStatus === "review_required" || requiresReview;

  const isReviewRequired = normalizedRegistrationStatus === "review_required";
  const canVerify = canRegister && normalizedRegistrationStatus === "allowed";

  const statusLabel = !canRegister
    ? normalizedRegistrationStatus === "review_required"
      ? "Perlu Review"
      : "Tidak Dapat Diverifikasi"
    : "Dapat Diverifikasi";

  const scoreColor = getScoreColor(normalizedRiskLevel);

  const statusClass = !canRegister
    ? needsReview
      ? "bg-yellow-50 text-yellow-700 border-yellow-100"
      : "bg-red-50 text-red-600 border-red-100"
    : "bg-green-50 text-green-700 border-green-100";

  const internal =
    similarityResult?.results?.internal_top3?.map(mapSimilarityItem) || [];

  const external =
    similarityResult?.results?.external_top3?.map(mapSimilarityItem) || [];

  const handleDownloadReport = () => {
    if (!result) return;

    downloadSimilarityReport({
      result,
      resultPercent,
      threshold,
      fileName,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl w-[1040px] max-w-[95vw] overflow-hidden">
      <div className="border-b px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase text-red-500">
            Verification Detail
          </p>

          <h2 className="text-lg font-semibold text-gray-800">
            Hasil Kemiripan Gambar
          </h2>
        </div>

        <span
          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${statusClass}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className="flex gap-6 p-6">
        <div className="basis-[52%] min-w-0">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">
              Preview Karya
            </p>

            <p className="text-xs text-gray-400">Uploaded image</p>
          </div>

          <div className="h-[430px] rounded-xl border border-gray-100 bg-gray-50 p-4 flex items-center justify-center">
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full object-contain rounded-lg shadow-sm"
              />
            ) : (
              <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center text-sm text-gray-400">
                Tidak ada preview
              </div>
            )}
          </div>

          {isReviewRequired && (
            <div className="mt-4 rounded-xl border border-yellow-100 bg-yellow-50 p-3">
              <p className="mb-3 text-xs font-medium text-yellow-700">
                Review manual diperlukan sebelum metadata dapat diverifikasi.
              </p>

              <div className="flex justify-end justify-center gap-3">
                <button
                  type="button"
                  onClick={onRejectReview}
                  className="rounded-md bg-white px-4 py-2 text-sm font-medium text-red-600 ring-1 ring-red-100 hover:bg-red-50"
                >
                  Reject
                </button>

                <ButtonAction
                  onClick={onApproveReview}
                  className="!bg-yellow-500 hover:!bg-yellow-600"
                >
                  Approve
                </ButtonAction>
              </div>
            </div>
          )}
        </div>

        <div className="basis-[60%] min-w-0 border-l pl-6">
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs text-gray-400">Skor kemiripan</p>

              <p className={`text-2xl font-bold ${scoreColor}`}>
                {resultPercent}%
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-3">
              <p className="text-xs text-gray-400">Status registrasi</p>

              <p className="text-lg font-bold capitalize text-gray-700">
                {registrationStatus || "-"}
              </p>
            </div>
          </div>

          <div className="max-h-[245px] overflow-y-auto pr-1">
            <SimilarityList
              title="Top 3 Internal"
              data={internal}
              onSelect={setSelectedMatch}
            />

            <div className="mt-4">
              <SimilarityList
                title="Top 3 External"
                data={external}
                onSelect={setSelectedMatch}
              />
            </div>
          </div>

          {decision && (
            <div className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-600">
              <div className="mb-1 flex items-center justify-between gap-3">
                <p className="font-semibold text-gray-700">
                  Keputusan Sistem
                </p>

                <span
                  className={`rounded-md px-2 py-1 font-medium capitalize ${getRiskBadgeClass(
                    normalizedRiskLevel
                  )}`}
                >
                  {riskLevel}
                </span>
              </div>

              <p className="leading-relaxed">{decision.reason}</p>
            </div>
          )}

          <div className={`mt-4 rounded-lg border p-3 text-xs ${statusClass}`}>
            {registrationReason ||
              (canRegister
                ? 'Klik "Verifikasi" untuk melanjutkan proses penyimpanan metadata karya.'
                : "Hasil belum dapat dilanjutkan ke registrasi metadata.")}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <ButtonCancel onClick={onCancel} />

            <ButtonDownloadReport
              onClick={handleDownloadReport}
              disabled={!result}
            >
              Download Report
            </ButtonDownloadReport>

            <button
              type="button"
              onClick={canVerify ? onVerify : undefined}
              disabled={!canVerify}
              aria-disabled={!canVerify}
              className={
                canVerify
                  ? "rounded-md bg-green-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-green-600 active:scale-95"
                  : "pointer-events-none cursor-not-allowed rounded-md border border-gray-200 bg-gray-200/60 px-5 py-2 text-sm font-medium text-gray-400 opacity-70 shadow-none"
              }
            >
              Verifikasi
            </button>
          </div>
        </div>
      </div>

      {selectedMatch && (
        <SimilarityDetailModal
          item={selectedMatch}
          onClose={() => setSelectedMatch(null)}
        />
      )}
    </div>
  );
}
