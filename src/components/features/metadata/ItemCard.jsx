export default function ItemCard({ data, onClick }) {
  if (!data) return null;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm p-3 cursor-pointer hover:shadow-md transition"
    >
      {/* IMAGE */}
      <div className="h-[110px] bg-gray-200 rounded-md mb-2"></div>

      {/* TITLE */}
      <h3 className="font-semibold text-gray-800 text-sm leading-tight">
        {data["Judul KI"]}
      </h3>

      {/* DESC */}
      <p className="text-xs text-gray-500 mb-1 line-clamp-2">
        {data.Deskripsi}
      </p>

      {/* CATEGORY */}
      <p className="text-xs text-gray-600">
        <b>Kategori:</b> {data.Kategori}
      </p>

      <p className="text-xs text-gray-600">
        <b>Sub:</b> {data["Sub Kategori"]}
      </p>
    </div>
  );
}