export default function ConfirmDelete({ onConfirm, onCancel }) {
  return (
    <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 text-center">

      <h2 className="text-lg font-semibold mb-6">
        Yakin ingin menghapus?
      </h2>

      <div className="flex justify-center gap-4">

        {/* CANCEL */}
        <button
          onClick={onCancel}
          className="px-5 py-2 rounded-md text-sm 
                     bg-gray-100 text-gray-700 
                     hover:bg-red-500 hover:text-white 
                     transition"
        >
          Cancel
        </button>

        {/* YES */}
        <button
          onClick={onConfirm}
          className="px-5 py-2 rounded-md text-sm 
                     bg-blue-500 text-white 
                     hover:bg-blue-600 
                     transition"
        >
          Yes
        </button>

      </div>
    </div>
  );
}