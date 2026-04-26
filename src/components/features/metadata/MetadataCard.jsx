export default function MetadataCard({ data, onClick }) {
  return (
    <div
      onClick={() => onClick(data)}
      className="bg-white rounded-xl shadow p-3 cursor-pointer hover:shadow-lg transition"
    >
      <img
        src="https://via.placeholder.com/300"
        className="rounded-lg mb-2"
      />

      <h3 className="font-semibold text-sm">
        {data["Judul KI"]}
      </h3>

      <p className="text-xs text-gray-500">
        {data["Sub Kategori"]}
      </p>

      <p className="text-xs mt-2 text-gray-400 line-clamp-3">
        {data["Deskripsi"]}
      </p>
    </div>
  );
}