import Button from "../../ui/Button.jsx";
import SimilarityItem from "./SimilarityItem.jsx";

export default function PlagiarismVerification({
  preview,
  resultPercent,
  threshold,
  onVerify,
  onCancel,
}) {
  const isAllowed = resultPercent <= threshold;

  const internal = [
    { img: "https://via.placeholder.com/100", percent: 92 },
    { img: "https://via.placeholder.com/100", percent: 87 },
    { img: "https://via.placeholder.com/100", percent: 80 },
  ];

  const external = [
    { img: "https://via.placeholder.com/100", percent: 78 },
    { img: "https://via.placeholder.com/100", percent: 70 },
    { img: "https://via.placeholder.com/100", percent: 65 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow w-[900px] flex gap-6">

      {/* LEFT IMAGE */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={preview}
          className="max-h-[400px] object-contain rounded-lg"
        />
      </div>

      {/* RIGHT */}
      <div className="flex-1 border-l pl-6">

        <h3 className="font-semibold mb-2">Top 3 Internal</h3>
        {internal.map((item, i) => (
          <SimilarityItem key={i} {...item} />
        ))}

        <h3 className="font-semibold mt-4 mb-2">Top 3 External</h3>
        {external.map((item, i) => (
          <SimilarityItem key={i} {...item} />
        ))}

        {/* TEXT */}
        {resultPercent <= threshold ? (
          <p className="text-xs text-gray-500 mt-4">
            Klik "Verifikasi" untuk melanjutkan proses penyimpanan metadata karya.
          </p>
        ) : (
          <p className="text-xs text-red-500 mt-4">
            Melebihi batas kemiripan, tidak dapat dilanjutkan ke verifikasi.
          </p>
        )}

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          {resultPercent <= threshold && (
            <Button variant="success" onClick={onVerify}>
              Verifikasi
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}