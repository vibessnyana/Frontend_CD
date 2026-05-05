import Modal from "../../ui/Modal.jsx";
import ButtonAction from "../../ui/button/ButtonAction.jsx";

export default function ErrorModal({ onClose }) {
  return (
    <Modal>
      <div className="flex flex-col items-center gap-4 text-center">

        {/* ICON ❌ */}
        <div className="text-red-500 text-4xl">✕</div>

        {/* TEXT */}
        <p className="text-gray-700 text-sm">
          Gagal menyimpan data.  
          <br />
          Silakan coba lagi.
        </p>

        {/* BUTTON */}
        <ButtonAction
          onClick={onClose}
          className="!bg-red-500 hover:!bg-red-600"
        >
          Tutup
        </ButtonAction>

      </div>
    </Modal>
  );
}