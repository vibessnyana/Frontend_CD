import Modal from "../ui/Modal";
import Button from "../ui/Button";

const SuccessModal = ({ message = "Success!", onClose }) => {
  return (
    <Modal onClose={onClose}>
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-3">
          ✅ Success
        </h2>

        <p className="mb-6 text-gray-500">
          {message}
        </p>

        <Button onClick={onClose}>
          OK
        </Button>
      </div>
    </Modal>
  );
};

export default SuccessModal;