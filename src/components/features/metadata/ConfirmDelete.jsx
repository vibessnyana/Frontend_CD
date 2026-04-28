export default function ConfirmDelete({ onCancel, onConfirm }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center w-[300px]">
      <h2 className="text-lg font-semibold mb-4">
        Yakin ingin menghapus?
      </h2>

      <div className="flex justify-center gap-4">
        <button
          onClick={onCancel}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>

        <button
          onClick={onConfirm}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Yes
        </button>
      </div>
    </div>
  );
}