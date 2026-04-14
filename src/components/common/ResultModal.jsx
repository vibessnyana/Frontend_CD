import Modal from "../ui/Modal";
import Button from "../ui/Button";

const ResultModal = ({
  percentage,
  onCancel,
  onVerify,
  onSave,
}) => {
  const isLow = percentage <= 30;
  const isMedium = percentage > 30 && percentage <= 70;
  const isHigh = percentage > 70;

  return (
    <Modal onClose={onCancel}>
      <div className="text-center">

        <h1 className="text-4xl font-bold mb-2">
          {percentage}%
        </h1>

        <p className="mb-6 text-gray-500">
          Terdeteksi Plagiarisme
        </p>

        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          {isLow && (
            <Button onClick={onSave}>
              Save
            </Button>
          )}

          {isMedium && (
            <Button onClick={onVerify}>
              Verifikasi
            </Button>
          )}

          {isHigh && null}
        </div>
      </div>
    </Modal>
  );
};

export default ResultModal;