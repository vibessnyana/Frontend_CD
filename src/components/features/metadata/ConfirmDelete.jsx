import ButtonCancel from "../../ui/Button/ButtonCancel.jsx";
import ButtonConfirmDelete from "../../ui/Button/ButtonConfirmDelete.jsx";

export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 text-center">

      <h2 className="text-lg font-semibold mb-6">
        Yakin ingin menghapus?
      </h2>

      <div className="flex justify-center gap-4">

        <ButtonCancel onClick={onCancel}>
          Cancel
        </ButtonCancel>

        <ButtonConfirmDelete onClick={onConfirm}>
          Yes
        </ButtonConfirmDelete>

      </div>
    </div>
  );
}