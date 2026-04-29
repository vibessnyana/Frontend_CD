import Modal from "../../ui/Modal.jsx";

export default function LoadingModal() {
  return (
    <Modal>
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
        <p className="text-sm text-gray-500">Processing...</p>
      </div>
    </Modal>
  );
}