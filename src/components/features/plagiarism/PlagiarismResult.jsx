import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

export default function PlagiarismResult({
  resultPercent,
  onCancel,
  onDetail,
}) {
  return (
    <Modal>
      <div className="flex flex-col items-center text-center">

        <h1 className="text-5xl font-bold text-yellow-500 mb-2">
          {resultPercent}%
        </h1>

        <p className="text-gray-600 mb-1">
          Tingkat Kemiripan Terdeteksi
        </p>

        <p className="text-xs text-gray-400 mb-6">
          Klik "Lihat Detail" untuk melihat kemiripan
        </p>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="success" onClick={onDetail}>
            Lihat Detail
          </Button>
        </div>

      </div>
    </Modal>
  );
}