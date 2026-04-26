import ModalWrapper from "./ModalWrapper";

export default function SuccessModal({ text, onClose }) {
  return (
    <ModalWrapper>
      <div className="bg-white p-6 rounded-xl text-center">
        <div className="text-green-500 text-3xl mb-2">
          ✔
        </div>

        <p className="mb-4">{text}</p>

        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Oke
        </button>
      </div>
    </ModalWrapper>
  );
}