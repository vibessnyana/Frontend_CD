export default function ItemCard({ item, onSelect }) {
  if (!item) return null;

  return (
    <div
      onClick={() => onSelect(item)} // 🔥 HARUS onSelect
      className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-md transition"
    >

      <div className="h-[120px] bg-gray-200 rounded-md mb-3"></div>

      <h3 className="font-semibold text-sm mb-1 line-clamp-1">
        {item["Judul KI"]}
      </h3>

      <p className="text-xs text-gray-500 mb-2 line-clamp-1">
        {item.Deskripsi}
      </p>

      <p className="text-xs">
        <span className="font-semibold">Kategori:</span> {item.Kategori}
      </p>

      <p className="text-xs">
        <span className="font-semibold">Sub:</span>{" "}
        {item["Sub Kategori"]}
      </p>

    </div>
  );
}