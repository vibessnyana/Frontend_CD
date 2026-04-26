export default function MetadataPreview({ data, onEdit, onDelete }) {
  if (!data) return null;

  return (
    <div className="bg-white p-6 rounded-xl shadow w-[500px]">
      <img
        src="https://via.placeholder.com/400"
        className="mb-4 rounded-lg"
      />

      <h2 className="font-semibold mb-2">
        {data["Judul KI"]}
      </h2>

      <p className="text-sm text-gray-500 mb-4">
        {data["Deskripsi"]}
      </p>

      <div className="flex justify-between">
        <button
          onClick={onDelete}
          className="text-red-600"
        >
          🗑 Delete
        </button>

        <button
          onClick={onEdit}
          className="bg-blue-500 text-white px-4 py-1 rounded"
        >
          Update
        </button>
      </div>
    </div>
  );
}