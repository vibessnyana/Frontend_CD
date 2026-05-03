export default function PlagiarismSettingModal({
  preview,
  threshold,
  setThreshold,
  onCancel,
  onCheck,
}) {
  return (
    <div className="fixed inset-0 flex items-start justify-center pt-24 z-50">
      {/* ⬆️ pt-24 = jarak dari atas (biar gak nempel navbar) */}

      <div className="bg-white w-[380px] rounded-2xl shadow-xl p-5 relative">
        {/* ⬆️ width diperkecil dari 420 → 380 */}
        {/* ⬆️ padding diperkecil */}

        {/* CLOSE */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-sm"
        >
          ✕
        </button>

        {/* IMAGE */}
        <img
          src={preview}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
        {/* ⬆️ tinggi gambar diperkecil */}

        {/* TITLE */}
        <h2 className="text-base font-semibold text-gray-700 mb-1">
          Batas Maksimum Kemiripan (%)
        </h2>

        <p className="text-xs text-gray-400 mb-3">
          Jika hasil melebihi nilai ini, karya tidak dapat diverifikasi.
        </p>

        {/* INPUT */}
        <input
          type="number"
          value={threshold}
          onChange={(e) => setThreshold(e.target.value)}
          className="w-full border rounded-lg px-3 py-2 text-sm mb-4"
        />

        {/* BUTTON */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-sm rounded-lg 
                       hover:bg-red-500 hover:text-white transition duration-200"
          >
            Cancel
          </button>

          <button
            onClick={onCheck}
            className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg 
                       hover:bg-green-700 transition duration-200"
          >
            Cek Plagiarisme
          </button>
        </div>
      </div>
    </div>
  );
}