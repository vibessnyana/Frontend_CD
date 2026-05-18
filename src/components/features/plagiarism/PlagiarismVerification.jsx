import { useState } from "react";
import ButtonCancel from "../../ui/button/ButtonCancel.jsx";
import ButtonAction from "../../ui/button/ButtonAction.jsx";
import SimilarityList from "./SimilarityList.jsx";
import SimilarityDetailModal from "./SimilarityDetailModal.jsx";

function mapSimilarityItem(item) {
  const metadata = item.metadata || {};
  const isInternal = item.source === "internal";

  return {
    img: metadata.image_url || item.image_url,
    percent: Number(((item.final_score || 0) * 100).toFixed(2)),
    title: metadata.title || item.title,
    owner: isInternal ? "Sumber: internal" : item.owner,
    sourceUrl: item.source_url || metadata.image_url,
    sourceType: item.source,
    raw: item,
  };
}

export default function PlagiarismVerification({
  preview,
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
  const normalizedRegistrationStatus = String(registrationStatus || "").toLowerCase();
  const registrationReason = result?.registration_reason;
  const riskLevel = decision?.risk_level || "unknown";
  const requiresReview = Boolean(decision?.requires_review);
  const needsReview = normalizedRegistrationStatus === "review_required" || requiresReview;
  const isReviewRequired = normalizedRegistrationStatus === "review_required";
  const canVerify = canRegister && normalizedRegistrationStatus === "allowed";
  const statusLabel = !canRegister
    ? normalizedRegistrationStatus === "review_required"
      ? "Perlu Review"
      : "Tidak Dapat Diverifikasi"
    : "Dapat Diverifikasi";
  const scoreColor = !canRegister
    ? needsReview
      ? "text-yellow-600"
      : "text-red-500"
    : "text-green-600";
  const statusClass = !canRegister
    ? needsReview
      ? "bg-yellow-50 text-yellow-700 border-yellow-100"
      : "bg-red-50 text-red-600 border-red-100"
    : "bg-green-50 text-green-700 border-green-100";

  const internal =
    similarityResult?.results?.internal_top3?.map(mapSimilarityItem) || [];
  const external =
    similarityResult?.results?.external_top3?.map(mapSimilarityItem) || [];

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

        <span className={`rounded-lg border px-3 py-1.5 text-xs font-semibold ${statusClass}`}>
          {statusLabel}
        </span>
      </div>

      <div className="flex gap-6 p-6">
        <div className="basis-[52%] min-w-0">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700">Preview Karya</p>
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
                <ButtonAction onClick={onApproveReview} className="!bg-yellow-500 hover:!bg-yellow-600">
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
                <p className="font-semibold text-gray-700">Keputusan Sistem</p>
                <span className="rounded-md bg-white px-2 py-1 font-medium capitalize text-gray-600">
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





