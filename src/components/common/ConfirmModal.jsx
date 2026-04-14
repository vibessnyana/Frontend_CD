import Modal from "../ui/Modal";
import Button from "../ui/Button";

const ConfirmModal = ({ message, onConfirm, onCancel }) => {
  return (
    <Modal onClose={onCancel}>
      <div className="text-center">
        <p className="mb-6">{message}</p>

        <div className="flex justify-center gap-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="danger" onClick={onConfirm}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;