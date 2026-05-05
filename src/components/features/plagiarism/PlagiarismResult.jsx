import Modal from "../../ui/Modal.jsx";

// ✅ BUTTON BARU
import ButtonCancel from "../../ui/button/ButtonCancel.jsx";
import ButtonAction from "../../ui/button/ButtonAction.jsx";

export default function PlagiarismResult({
  resultPercent,
  onCancel,
  onDetail,
}) {
  return (
    <Modal>
      <div className="flex flex-col items-center text-center">

        {/* PERCENT */}
        <h1 className="text-5xl font-bold text-yellow-500 mb-2">
          {resultPercent}%
        </h1>

        {/* TEXT */}
        <p className="text-gray-600 mb-1">
          Tingkat Kemiripan Terdeteksi
        </p>

        <p className="text-xs text-gray-400 mb-6">
          Klik "Lihat Detail" untuk melihat kemiripan
        </p>

        {/* BUTTON */}
        <div className="flex gap-3">

          {/* CANCEL */}
          <ButtonCancel onClick={onCancel} />

          {/* LIHAT DETAIL */}
          <ButtonAction onClick={onDetail}>
            Lihat Detail
          </ButtonAction>

        </div>

      </div>
    </Modal>
  );
}