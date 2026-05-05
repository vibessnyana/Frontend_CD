import ButtonCancel from "../../ui/button/ButtonCancel.jsx";
import ButtonAction from "../../ui/button/ButtonAction.jsx";
import SimilarityList from "./SimilarityList.jsx";

export default function PlagiarismVerification({
  preview,
  resultPercent,
  threshold,
  onVerify,
  onCancel,
}) {

  // 🔥 LOGIC (TIDAK DIUBAH)
  const isAllowed = resultPercent <= threshold;

  console.log("RESULT:", resultPercent);
  console.log("THRESHOLD (MEDIUM):", threshold);
  console.log("IS ALLOWED:", isAllowed);

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

      {/* ================= LEFT IMAGE ================= */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={preview}
          alt="preview"
          className="max-h-[400px] object-contain rounded-lg"
        />
      </div>

      {/* ================= RIGHT PANEL ================= */}
      <div className="flex-1 border-l pl-6">

        {/* INTERNAL */}
        <SimilarityList title="Top 3 Internal" data={internal} />

        {/* EXTERNAL */}
        <div className="mt-4">
          <SimilarityList title="Top 3 External" data={external} />
        </div>

        {/* ================= INFO ================= */}
        {isAllowed ? (
          <p className="text-xs text-gray-500 mt-4">
            Klik <span className="font-medium">"Verifikasi"</span> untuk melanjutkan proses penyimpanan metadata karya.
          </p>
        ) : (
          <p className="text-xs text-red-500 mt-4">
            Melebihi batas kemiripan (medium threshold), tidak dapat dilanjutkan ke verifikasi.
          </p>
        )}

        {/* ================= BUTTON ================= */}
        <div className="flex justify-end gap-3 mt-4">

          {/* CANCEL */}
          <ButtonCancel onClick={onCancel} />

          {/* VERIFIKASI */}
          {isAllowed && (
            <ButtonAction onClick={onVerify}>
              Verifikasi
            </ButtonAction>
          )}

        </div>

      </div>
    </div>
  );
}