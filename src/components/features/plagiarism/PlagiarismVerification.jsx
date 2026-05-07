import { useState } from "react";
import ButtonCancel from "../../ui/button/ButtonCancel.jsx";
import ButtonAction from "../../ui/button/ButtonAction.jsx";
import SimilarityList from "./SimilarityList.jsx";
import SimilarityDetailModal from "./SimilarityDetailModal.jsx";

function mapSimilarityItem(item) {
  return {
    img: item.image_url,
    percent: Number(((item.final_score || 0) * 100).toFixed(2)),
    title: item.title,
    owner: item.owner,
    sourceUrl: item.source_url,
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
}) {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const isAllowed = resultPercent <= threshold;
  const similarityResult = result?.similarity_result;
  const decision = result?.decision_result?.decision;
  const riskLevel = decision?.risk_level || "unknown";
  const statusLabel = isAllowed ? "Dapat Diverifikasi" : "Perlu Ditinjau";
  const scoreColor = isAllowed ? "text-green-600" : "text-red-500";
  const statusClass = isAllowed
    ? "bg-green-50 text-green-700 border-green-100"
    : "bg-red-50 text-red-600 border-red-100";

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
              <p className="text-xs text-gray-400">Threshold</p>
              <p className="text-2xl font-bold text-gray-700">
                {threshold}%
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
            {isAllowed
              ? 'Klik "Verifikasi" untuk melanjutkan proses penyimpanan metadata karya.'
              : "Melebihi batas kemiripan, tidak dapat dilanjutkan ke verifikasi."}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <ButtonCancel onClick={onCancel} />

            {isAllowed && (
              <ButtonAction onClick={onVerify}>
                Verifikasi
              </ButtonAction>
            )}
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
