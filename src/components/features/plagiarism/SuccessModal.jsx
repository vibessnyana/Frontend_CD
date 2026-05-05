import Modal from "../../ui/Modal.jsx";

import ButtonAction from "../../ui/button/ButtonAction.jsx";

export default function SuccessModal({ onClose }) {
  return (
    <Modal>
      <div className="flex flex-col items-center gap-3">

        {/* ICON */}
        <div className="text-green-500 text-4xl">✔</div>

        {/* TEXT */}
        <p className="text-gray-700 text-sm">
          Karya Ilmiah berhasil disimpan
        </p>

        {/* BUTTON */}
        <ButtonAction 
        onClick={onClose}
        >
          Tutup
        </ButtonAction>

      </div>
    </Modal>
  );
}