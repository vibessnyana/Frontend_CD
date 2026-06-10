import { useMemo, useState } from "react";

import ButtonCancel from "../../ui/Button/ButtonCancel.jsx";
import ButtonSaveReport from "../../ui/Button/ButtonSaveReport.jsx";
import SimilarityList from "../plagiarism/SimilarityList.jsx";
import SimilarityDetailModal from "../plagiarism/SimilarityDetailModal.jsx";

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
  const source = report || data || {};

  return (
    source.report ||
    source.plagiarism_report ||
    source.plagiarismReport ||
    source.similarity_report ||
    source.similarityReport ||
    source.check_result ||
    source.checkResult ||
    source.result ||
    null
  );
}

function getNumber(value) {
  if (value === undefined || value === null || value === "") return null;

  if (typeof value === "string") {
    const cleaned = value.replace("%", "").trim();
    const parsed = Number(cleaned);

    return Number.isNaN(parsed) ? null : parsed;
  }

  const parsed = Number(value);

  return Number.isNaN(parsed) ? null : parsed;
}

function toPercent(value) {
  const number = getNumber(value);
  if (number === null) return null;

  return number <= 1 ? number * 100 : number;
}

function toRatio(value) {
  const number = getNumber(value);
  if (number === null) return undefined;

  return number > 1 ? number / 100 : number;
}

function formatPercent(value) {
  const percent = toPercent(value);
  if (percent === null) return "-";

  return `${Number(percent.toFixed(2))}%`;
}

function getScoreValue(report) {
  return (
    report?.resultPercent ??
    report?.result_percent ??
    report?.score_percent ??
    report?.similarity_percent ??
    report?.similarity_score ??
    report?.final_score ??
    report?.score ??
    report?.similarity_result?.overall_score ??
    report?.similarity_result?.highest_score ??
    report?.similarity_result?.highest_final_score ??
    report?.decision_result?.decision?.highest_score ??
    report?.decision_result?.decision?.score
  );
}

function getResultGroups(report) {
  const results = report?.similarity_result?.results || report?.results || {};

  return {
    internal:
      results.internal_top3 ||
      results.internal ||
      report?.internal_top3 ||
      report?.top3_internal ||
      [],

    external:
      results.external_top3 ||
      results.external ||
      report?.external_top3 ||
      report?.top3_external ||
      [],
  };
}

function mapSimilarityItem(item, sourceType) {
  const metadata = item?.metadata || {};
  const source = item?.source || sourceType;

  const score =
    item?.final_score ??
    item?.score ??
    item?.similarity_score ??
    item?.percent;

  const clipScore =
    item?.clip_score ??
    item?.context_score ??
    item?.visual_context_score;

  const cnnScore =
    item?.cnn_score ??
    item?.detail_score ??
    item?.visual_detail_score;

  const imageUrl =
    metadata.image_url ||
    metadata.imageUrl ||
    item?.image_url ||
    item?.imageUrl ||
    item?.thumbnail_url ||
    item?.thumbnailUrl ||
    item?.img ||
    item?.url ||
    "";

  const title =
    metadata.title ||
    metadata["Judul KI"] ||
    item?.title ||
    item?.judul ||
    item?.name ||
    "Tanpa judul";

  const sourceUrl =
    item?.source_url ||
    item?.sourceUrl ||
    item?.url ||
    metadata.image_url ||
    "";

  return {
    img: imageUrl,
    percent: Number((toPercent(score) || 0).toFixed(2)),
    title,
    owner:
      source === "internal"
        ? "Sumber: internal"
        : item?.owner || sourceUrl || "Sumber: external",
    sourceUrl,
    sourceType: source,
    raw: {
      ...item,
      source,
      metadata,
      final_score: toRatio(score),
      clip_score: toRatio(clipScore),
      cnn_score: toRatio(cnnScore),
      source_url: sourceUrl,
      image_url: imageUrl,
      title,
    },
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

function buildReportPayload({
  data,
  rawReport,
  internalData,
  externalData,
  scoreValue,
  registrationStatus,
  registrationReason,
  decision,
  previewImage,
}) {
  return {
    metadata_id: data?._id || data?.id || data?.metadata_id || null,
    check_id: data?.check_id || rawReport?.check_id || null,
    ki_id: data?.ki_id || null,
    ki_uuid: data?.ki_uuid || null,
    title: data?.["Judul KI"] || data?.title || rawReport?.title || "",
    image_url: previewImage || data?.image_url || rawReport?.image_url || "",
    saved_at: new Date().toISOString(),

    report: {
      ...rawReport,
      check_id: data?.check_id || rawReport?.check_id || null,
      image_url: previewImage || data?.image_url || rawReport?.image_url || "",
      final_score: toRatio(scoreValue),
      registration_status: registrationStatus,
      registration_reason: registrationReason,
      decision_result: rawReport?.decision_result || {
        decision,
      },
      similarity_result: rawReport?.similarity_result || {
        results: {
          internal_top3: internalData.map((item) => item.raw),
          external_top3: externalData.map((item) => item.raw),
        },
      },
    },
  };
}

export default function ReportModal({
  data,
  report,
  loading = false,
  saving = false,
  onCancel,
  onSaveReport,
}) {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [imageError, setImageError] = useState(false);

  const rawReport = useMemo(() => getRawReport(data, report), [data, report]);

  const decision =
    rawReport?.decision_result?.decision ||
    rawReport?.decision ||
    rawReport?.system_decision ||
    null;

  const riskLevel = String(
    decision?.risk_level ||
      rawReport?.risk_level ||
      rawReport?.riskLevel ||
      "unknown"
  ).toLowerCase();

  const registrationStatus =
    rawReport?.registration_status ||
    rawReport?.registrationStatus ||
    rawReport?.status ||
    data?.registration_status ||
    "-";

  const registrationReason =
    rawReport?.registration_reason ||
    rawReport?.registrationReason ||
    decision?.reason ||
    "";

  const originalPreviewImage = firstValidImageUrl(
    data?.image_url,
    data?.imageUrl,
    data?.image,
    data?.gambar,
    rawReport?.metadata?.image_url,
    rawReport?.metadata?.imageUrl,
    rawReport?.image_url,
    rawReport?.imageUrl,
    rawReport?.uploaded_image_url,
    rawReport?.uploadedImageUrl
  );

  const previewImage = getCloudinaryPreviewUrl(originalPreviewImage);

  const scoreValue = getScoreValue(rawReport);
  const scoreText = formatPercent(scoreValue);
  const scoreColor = getScoreColor(riskLevel);
  const statusClass = getStatusClass(registrationStatus);

  const { internal, external } = getResultGroups(rawReport || {});

  const internalData = internal.map((item) =>
    mapSimilarityItem(item, "internal")
  );

  const externalData = external.map((item) =>
    mapSimilarityItem(item, "external")
  );

  const hasReport =
    Boolean(rawReport?.similarity_result) ||
    Boolean(rawReport?.decision_result) ||
    Boolean(rawReport?.results) ||
    internalData.length > 0 ||
    externalData.length > 0 ||
    scoreValue !== undefined;

  const handleSaveReport = () => {
    if (!onSaveReport || !rawReport) return;

    const payload = buildReportPayload({
      data,
      rawReport,
      internalData,
      externalData,
      scoreValue,
      registrationStatus,
      registrationReason,
      decision,
      previewImage: originalPreviewImage,
    });

    onSaveReport(payload);
  };

  if (loading) {
    return (
      <div className="w-[420px] max-w-[90vw] rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-red-600"></div>

        <h2 className="mt-4 text-base font-semibold text-gray-700">
          Mengambil report
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
          Report belum tersedia
        </h2>

        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Data metadata ini belum memiliki hasil similarity report dari database.
        </p>

        <div className="mt-5 flex justify-center gap-3">
          <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>
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
              Similarity Report
            </p>

            <h2 className="text-lg font-semibold text-gray-800">
              Hasil Kemiripan Metadata
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-md px-2 py-1 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            x
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-8">
        <div className="flex gap-6">
          <div className="basis-[52%] min-w-0">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">
                Preview Karya
              </p>

              <p className="text-xs text-gray-400">Uploaded image</p>
            </div>

            <div className="flex h-[430px] items-center justify-center rounded-xl border border-gray-100 bg-gray-50 p-4">
              {previewImage && !imageError ? (
                <img
                  src={previewImage}
                  alt={data?.["Judul KI"] || "preview report"}
                  onError={() => setImageError(true)}
                  className="h-full w-full rounded-lg object-contain shadow-sm"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-lg bg-gray-100 text-sm text-gray-400">
                  Tidak ada preview
                </div>
              )}
            </div>
          </div>

          <div className="basis-[60%] min-w-0 border-l pl-6">
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
                  {decision.reason || registrationReason || "-"}
                </p>
              </div>
            )}

            <div
              className={`mt-4 rounded-lg border p-3 text-xs ${statusClass}`}
            >
              {registrationReason || "Report similarity berhasil ditampilkan."}
            </div>

            <div className="mt-5 flex justify-end gap-3 pb-2">
              <ButtonCancel onClick={onCancel}>Cancel</ButtonCancel>

              <ButtonSaveReport onClick={handleSaveReport} disabled={saving}>
                {saving ? "Menyimpan..." : "Save Report"}
              </ButtonSaveReport>
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