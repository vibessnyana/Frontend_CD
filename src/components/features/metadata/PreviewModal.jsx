export default function PreviewModal({ data, onClose, onEdit, onDelete }) {
  if (!data) return null;

  const Row = ({ label, value }) => (
    <div className="flex items-start gap-4 py-1">
      <div className="w-[140px] text-gray-400 text-sm">
        {label}
      </div>
      <div className="flex-1 text-gray-700 text-sm font-medium break-words">
        {value}
      </div>
    </div>
  );

  return (
    <div className="bg-white w-[600px] max-h-[85vh] overflow-y-auto rounded-2xl shadow-xl p-6">

      {/* IMAGE */}
      <div className="h-[200px] bg-gray-200 rounded-xl mb-5"></div>

      {/* MAIN */}
      <div className="space-y-2">
        <Row label="Judul" value={data["Judul KI"]} />
        <Row label="Deskripsi" value={data.Deskripsi} />
      </div>

      <div className="border-t my-4"></div>

      {/* DETAIL */}
      <div className="space-y-2">
        <Row label="No" value={data.No} />
        <Row label="KI ID" value={data.ki_id} />
        <Row label="UUID" value={data.ki_uuid} />
        <Row label="Kategori" value={data.Kategori} />
        <Row label="Sub Kategori" value={data["Sub Kategori"]} />
        <Row label="Kategori HC" value={data["Kategori HC"]} />
        <Row label="Sub Kategori HC" value={data["Sub Kategori HC"]} />
      </div>

      {/* BUTTON */}
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-100 rounded-md text-sm hover:bg-gray-200"
        >
          Cancel
        </button>

        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-md text-sm hover:bg-red-600"
        >
          Delete
        </button>

        <button
          onClick={onEdit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
        >
          Update
        </button>
      </div>

    </div>
  );
}