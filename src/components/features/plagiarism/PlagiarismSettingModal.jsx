import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

export default function PlagiarismSettingModal({
  preview,
  threshold,
  setThreshold,
  onCancel,
  onCheck,
}) {
  return (
    <Modal>
      <div className="flex flex-col items-center gap-4">

        <img src={preview} className="w-[200px] rounded-md" />

        <div className="w-full">
          <label className="text-sm font-medium">
            Batas Maksimum Kemiripan (%)
          </label>

          <p className="text-xs text-gray-500 mb-2">
            Jika hasil melebihi nilai ini, karya tidak dapat diverifikasi.
          </p>

          <input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            className="input"
          />
        </div>

        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="success" onClick={onCheck}>
            Cek Plagiarisme
          </Button>
        </div>

      </div>
    </Modal>
  );
}