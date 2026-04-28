export default function PreviewModal({ data, onEdit, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl w-[500px]">
      <img
        src="https://via.placeholder.com/400"
        className="rounded-lg mb-4"
      />

      <h2 className="font-semibold">{data["Judul KI"]}</h2>
      <p className="text-gray-500 mb-4">{data.Deskripsi}</p>

      <div className="flex justify-end gap-2">
        <button onClick={onDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>

        <button onClick={onEdit} className="bg-blue-500 text-white px-4 py-2 rounded">
          Update
        </button>
      </div>
    </div>
  );
}