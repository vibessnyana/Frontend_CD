import { useMemo, useState } from "react";

import ButtonCancel from "../../ui/Button/ButtonCancel.jsx";
import ButtonDownloadReport from "../../ui/Button/ButtonDownloadReport.jsx";
import SimilarityList from "../plagiarism/SimilarityList.jsx";
import SimilarityDetailModal from "../plagiarism/SimilarityDetailModal.jsx";
import { downloadSimilarityReport } from "../../../utils/downloadSimilarityReport.js";

function getCloudinaryPreviewUrl(url) {
  if (
    !url ||
    !url.includes("res.cloudinary.com") ||
    !url.includes("/image/upload/")
  ) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto,w_900,c_fit/"
  );
}

function isValidImageUrl(url) {
  if (!url) return false;

  const value = String(url);

  if (value.startsWith("blob:")) return false;
  if (value.startsWith("data:")) return false;

  return true;
}

function firstValidImageUrl(...urls) {
  return urls.find((url) => isValidImageUrl(url)) || "";
}

function getRawReport(data, report) {
  const source = report || data || null;

  if (!source) return null;

  const reportFromSource = source.report || data?.report || null;

  if (
    reportFromSource?.similarity_result ||
    reportFromSource?.decision_result
  ) {
    return reportFromSource;
  }

  if (source?.similarity_result || source?.decision_result) {
    return source;
  }

  return null;
}

function toPercent(value) {
  if (value === undefined || value === null || value === "") return null;

  const number = Number(value);

  if (Number.isNaN(number)) return null;

  return number <= 1 ? number * 100 : number;
}


function formatPercent(value) {
  const percent = toPercent(value);

  if (percent === null) return "-";

  return `${Number(percent.toFixed(2))}%`;
}

function getScoreValue(report) {
  return report?.similarity_result?.overall_score ?? null;
}

function getDecision(report) {
  return report?.decision_result?.decision || null;
}

function getResultGroups(report) {
  const results = report?.similarity_result?.results || {};

  return {
    internal: Array.isArray(results.internal_top3)
      ? results.internal_top3
      : [],

    external: Array.isArray(results.external_top3)
      ? results.external_top3
      : [],
  };
}

function mapSimilarityItem(item) {
  const metadata = item?.metadata || {};
  const isInternal = item?.source === "internal";

  const imageUrl = isInternal
    ? metadata.image_url || item?.image_url || ""
    : item?.image_url || "";

  const title = isInternal
    ? metadata.title || "Tanpa judul"
    : item?.title || "Tanpa judul";

  const sourceUrl = isInternal
    ? metadata.image_url || ""
    : item?.source_url || item?.image_url || "";

  const percent = toPercent(item?.final_score);

  return {
    img: imageUrl,
    percent: percent === null ? 0 : Number(percent.toFixed(2)),
    title,
    owner: isInternal
      ? "Sumber: internal"
      : item?.source_url || "Sumber: external",
    sourceUrl,
    sourceType: item?.source,
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
      return "bg-gray-50 text-gray-600";
  }
}

function getStatusClass(status) {
  const normalizedStatus = String(status || "").toLowerCase();

  if (normalizedStatus === "blocked") {
    return "bg-red-50 text-red-700 border-red-100";
  }

  if (normalizedStatus === "review_required") {
    return "bg-yellow-50 text-yellow-700 border-yellow-100";
  }

  if (normalizedStatus === "allowed") {
    return "bg-green-50 text-green-700 border-green-100";
  }

  return "bg-gray-50 text-gray-700 border-gray-100";
}

function capitalizeText(value) {
  if (!value) return "-";

  return String(value)
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function buildPreviewReport(data) {
  const imageUrl = data?.image_url || data?.imageUrl || "";
  const title = data?.["Judul KI"] || data?.title || "Contoh karya";

  return {
    check_id: "preview-report",
    registration_status: "review_required",
    registration_reason:
      "Ini adalah data contoh untuk melihat tampilan laporan. Data ini tidak berasal dari hasil pemeriksaan.",
    image_url: imageUrl,
    similarity_result: {
      overall_score: 0.7425,
      results: {
        internal_top3: [
          {
            source: "internal",
            final_score: 0.6812,
            metadata: {
              title: `${title} - Referensi Internal`,
              image_url: imageUrl,
            },
          },
        ],
        external_top3: [
          {
            source: "external",
            final_score: 0.7425,
            title: "Contoh kandidat eksternal",
            image_url: imageUrl,
            source_url: "https://example.com/contoh-sumber",
          },
          {
            source: "external",
            final_score: 0.635,
            title: "Contoh kandidat pembanding",
            image_url: imageUrl,
            source_url: "https://example.com/contoh-pembanding",
          },
        ],
      },
    },
    decision_result: {
      decision: {
        status: "medium_similarity",
        risk_level: "medium",
        requires_review: true,
        reason:
          "Contoh keputusan sistem: hasil berada pada rentang kemiripan menengah dan memerlukan review manual.",
      },
    },
  };
}
export default function ReportModal({
  data,
  report,
  loading = false,
  onCancel,
}) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [failedImageUrl, setFailedImageUrl] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const storedReport = useMemo(() => getRawReport(data, report), [data, report]);
  const isPreview = !storedReport && showPreview;
  const rawReport = useMemo(
    () => storedReport || (isPreview ? buildPreviewReport(data) : null),
    [data, isPreview, storedReport]
  );

  const decision = getDecision(rawReport);

  const riskLevel = String(decision?.risk_level || "unknown").toLowerCase();

  const registrationStatus =
    rawReport?.registration_status || data?.registration_status || "-";

  const registrationReason =
    rawReport?.registration_reason || decision?.reason || "";

  const originalPreviewImage = firstValidImageUrl(
    data?.image_url,
    data?.imageUrl,
    rawReport?.image_url,
    rawReport?.uploaded_image_url
  );

  const previewImage = getCloudinaryPreviewUrl(originalPreviewImage);


  const scoreValue = getScoreValue(rawReport);
  const scoreText = formatPercent(scoreValue);
  const scoreColor = getScoreColor(riskLevel);
  const statusClass = getStatusClass(registrationStatus);

  const { internal, external } = getResultGroups(rawReport);

  const internalData = internal.map(mapSimilarityItem);
  const externalData = external.map(mapSimilarityItem);

  const hasReport = Boolean(
    rawReport?.similarity_result || rawReport?.decision_result
  );

  const handleDownloadReport = () => {
    if (!rawReport || isPreview) return;

    downloadSimilarityReport({
      result: rawReport,
      fileName: data?.["Judul KI"] || data?.title || rawReport?.check_id,
    });
  };

  if (loading) {
    return (
      <div className="w-[420px] max-w-[90vw] rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />

        <h2 className="mt-4 text-base font-semibold text-gray-700">
          Mengambil laporan
        </h2>

        <p className="mt-2 text-sm text-gray-400">
          Mohon tunggu sebentar...
        </p>
      </div>
    );
  }

  if (!hasReport) {
    return (
      <div className="w-[460px] max-w-[90vw] rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-50 text-2xl text-yellow-600">
          !
        </div>

        <h2 className="text-lg font-semibold text-gray-800">
          Laporan belum tersedia
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Data metadata ini belum memiliki hasil similarity report dari database.
        </p>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <ButtonCancel onClick={onCancel}>Tutup</ButtonCancel>

          {import.meta.env.DEV && (
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className="rounded-md bg-red-500 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600"
            >
              Lihat Contoh Tampilan
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-h-[88vh] w-[1040px] max-w-[95vw] flex-col overflow-hidden rounded-xl bg-white shadow-xl">
      <div className="shrink-0 border-b px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-medium uppercase text-red-500">
              Laporan Kemiripan
            </p>

            <h2 className="text-lg font-semibold text-gray-800">
              Hasil Kemiripan Gambar
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-md px-2 py-1 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Tutup laporan"
            title="Tutup laporan"
          >
            X
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-8">
        {isPreview && (
          <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-700">
            Mode pratinjau menggunakan data contoh. Tombol unduh dinonaktifkan.
          </div>
        )}

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="min-w-0 lg:basis-[48%]">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                Preview Karya
              </p>

              <p className="text-xs text-gray-400">Uploaded image</p>
            </div>

            <div className="flex h-[300px] items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-4 sm:h-[380px] lg:h-[430px]">
              {previewImage && failedImageUrl !== previewImage ? (
                <img
                  src={previewImage}
                  alt={data?.["Judul KI"] || data?.title || "preview report"}
                  onError={() => setFailedImageUrl(previewImage)}
                  className="h-full w-full rounded-lg object-contain shadow-sm"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  Tidak ada preview
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0 border-t pt-6 lg:basis-[52%] lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Skor kemiripan</p>

                <p className={`text-2xl font-bold ${scoreColor}`}>
                  {scoreText}
                </p>
              </div>

              <div className="rounded-lg bg-gray-50 p-3">
                <p className="text-xs text-gray-400">Status registrasi</p>

                <p className="text-lg font-bold capitalize text-gray-700">
                  {capitalizeText(registrationStatus)}
                </p>
              </div>
            </div>

            <div className="max-h-[245px] overflow-y-auto pr-1">
              <SimilarityList
                title="Top 3 Internal"
                data={internalData}
                onSelect={setSelectedMatch}
              />

              <div className="mt-4">
                <SimilarityList
                  title="Top 3 External"
                  data={externalData}
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
                      riskLevel
                    )}`}
                  >
                    {riskLevel}
                  </span>
                </div>

                <p className="leading-relaxed">
                  {decision.reason || "-"}
                </p>
              </div>
            )}

            <div
              className={`mt-4 rounded-lg border p-3 text-xs ${statusClass}`}
            >
              {registrationReason || "Report similarity berhasil ditampilkan."}
            </div>

            <div className="mt-5 flex justify-end gap-3 pb-2">
              <ButtonCancel onClick={onCancel}>Tutup</ButtonCancel>

              <ButtonDownloadReport
                onClick={handleDownloadReport}
                disabled={!rawReport || isPreview}
              >
                Download Report
              </ButtonDownloadReport>
            </div>
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
