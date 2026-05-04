import Button from "../../ui/Button.jsx";
import SimilarityList from "./SimilarityList.jsx";

export default function PlagiarismVerification({
  preview,
  resultPercent,
  threshold, // 🔥 ini = MEDIUM threshold dari setting
  onVerify,
  onCancel,
}) {

  // 🔥 LOGIC UTAMA (SUDAH BENAR)
  const isAllowed = resultPercent <= threshold;

  // 🔥 DEBUG (kalau mau cek, boleh dihapus nanti)
  console.log("RESULT:", resultPercent);
  console.log("THRESHOLD (MEDIUM):", threshold);
  console.log("IS ALLOWED:", isAllowed);

  // 🔥 DUMMY DATA (biarin aja dulu)
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

        {/* ================= INFO TEXT ================= */}
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
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          {/* 🔥 VERIFIKASI (HANYA MUNCUL KALAU LOLOS) */}
          {isAllowed && (
            <Button variant="success" onClick={onVerify}>
              Verifikasi
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}