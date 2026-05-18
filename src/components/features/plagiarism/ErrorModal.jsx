import Modal from "../../ui/Modal.jsx";
import ButtonAction from "../../ui/button/ButtonAction.jsx";

export default function ErrorModal({ message, onClose }) {
  return (
    <Modal>
      <div className="flex max-w-[360px] flex-col items-center gap-4 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50 text-3xl text-red-500">
          x
        </div>

        <div>
          <p className="font-semibold text-gray-800">Gagal menyimpan data.</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-gray-600">
            {message || "Silakan coba lagi."}
          </p>
        </div>

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
