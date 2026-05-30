export default function ItemCard({ item, onSelect }) {
  if (!item) return null;

  return (
    <div
      onClick={() => onSelect(item)}
      className="min-h-[245px] cursor-pointer overflow-hidden rounded-xl bg-white p-4 shadow transition hover:shadow-md"
    >
      {item.image_url ? (
        <img
          src={item.image_url}
          alt={item["Judul KI"] || "Gambar metadata"}
          className="mb-3 h-[145px] w-full rounded-md bg-gray-100 object-contain"
        />
      ) : (
        <div className="mb-3 h-[145px] w-full rounded-md bg-gray-200"></div>
      )}

      <h3 className="mb-1 line-clamp-1 text-sm font-semibold leading-5 text-gray-700">
        {item["Judul KI"]}
      </h3>

      <p className="mb-2 line-clamp-1 text-xs leading-4 text-gray-500">
        {item.Deskripsi}
      </p>

      <p className="line-clamp-1 text-xs leading-4 text-gray-500">
        <span className="font-semibold">Kategori:</span> {item.Kategori}
      </p>

      <p className="line-clamp-1 text-xs leading-4 text-gray-500">
        <span className="font-semibold">Sub:</span>{" "}
        {item["Sub Kategori"]}
      </p>
    </div>
  );
}
