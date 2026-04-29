import Modal from "../../ui/Modal.jsx";
import Button from "../../ui/Button.jsx";

export default function SuccessModal({ onClose }) {
  return (
    <Modal>
      <div className="flex flex-col items-center gap-3">
        <div className="text-green-500 text-4xl">✔</div>
        <p>Save successful</p>
        <Button onClick={onClose}>Oke</Button>
      </div>
    </Modal>
  );
}