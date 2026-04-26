import ModalWrapper from "./ModalWrapper";

export default function DeleteModal({ onConfirm, onCancel }) {
  return (
    <ModalWrapper>
      <div className="bg-white p-6 rounded-xl text-center">
        <p className="mb-4">
          Are you sure want to delete?
        </p>

        <div className="flex justify-center gap-3">
          <button onClick={onCancel}>Cancel</button>

          <button
            onClick={onConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Yes
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}