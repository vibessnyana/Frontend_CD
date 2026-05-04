import Button from "../../ui/Button.jsx";

export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 text-center">

      <h2 className="text-lg font-semibold mb-6">
        Yakin ingin menghapus?
      </h2>

      <div className="flex justify-center gap-4">

        <Button
          onClick={onCancel}
          variant="secondary"
        >
          Cancel
        </Button>

        <Button
          onClick={onConfirm}
          variant="primary"
        >
          Yes
        </Button>

      </div>
    </div>
  );
}