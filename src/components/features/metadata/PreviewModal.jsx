function Row({ label, value }) {
  return (
    <div className="flex items-start gap-4 py-2">
      <div className="w-[140px] text-gray-400 text-sm">
        {label}
      </div>
      <div className="flex-1 text-sm font-semibold text-gray-800">
        {value}
      </div>
    </div>
  );
}

export default function PreviewModal({
  data,
  onDelete,
  onEdit,
  onClose,
}) {
  return (
    <div className="bg-white w-[600px] rounded-2xl shadow-xl overflow-hidden">

      {/* SCROLL AREA */}
      <div className="h-[80vh] overflow-y-auto p-6">

        {/* TITLE */}
        <h2 className="text-lg font-semibold mb-4">
          Detail Metadata
        </h2>

        {/* 🔥 IMAGE (BALIK LAGI) */}
        <div className="w-full h-[180px] bg-gray-200 rounded-lg mb-4"></div>

        {/* DATA */}
        <Row label="Judul" value={data["Judul KI"]} />
        <Row label="Deskripsi" value={data.Deskripsi} />

        <div className="border-t my-4"></div>

        <Row label="KI ID" value={data.ki_id} />
        <Row label="UUID" value={data.ki_uuid} />
        <Row label="Kategori" value={data.Kategori} />
        <Row label="Sub Kategori" value={data["Sub Kategori"]} />
        <Row label="Kategori HC" value={data["Kategori HC"]} />
        <Row label="Sub Kategori HC" value={data["Sub Kategori HC"]} />

        {/* BUTTON */}
        <div className="flex justify-end gap-4 mt-6 pt-4 border-t">

          {/* CANCEL */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm 
                       hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>

          {/* UPDATE */}
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm 
                       hover:bg-blue-600 transition"
          >
            Update
          </button>

           {/* DELETE (ICON MERAH, LEBIH BAGUS) */}
          <button
            onClick={onDelete}
            className="p-2 bg-red-500 rounded-md hover:bg-red-600 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 3a1 1 0 00-1 1v1H5a1 1 0 000 2h1v11a2 2 0 002 2h8a2 2 0 002-2V7h1a1 1 0 100-2h-3V4a1 1 0 00-1-1H9zm2 4a1 1 0 112 0v9a1 1 0 11-2 0V7zm-3 0a1 1 0 112 0v9a1 1 0 11-2 0V7zm6 0a1 1 0 112 0v9a1 1 0 11-2 0V7z" />
            </svg>
          </button>

        </div>

      </div>
    </div>
  );
}