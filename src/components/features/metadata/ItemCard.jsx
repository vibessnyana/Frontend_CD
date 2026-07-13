function getCloudinaryImageUrl(url, transformation) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/image/upload/")) {
    return url;
  }

  return url.replace("/image/upload/", `/image/upload/${transformation}/`);
}

export default function ItemCard({ item, onSelect, priority = false }) {
  if (!item) return null;

  const title = item["Judul KI"] || "Gambar metadata";
  const thumbnailUrl = getCloudinaryImageUrl(
    item.image_url,
    "f_auto,q_auto,w_220,h_170,c_fit"
  );

  return (
    <div
      onClick={() => onSelect(item)}
      className="min-h-[245px] cursor-pointer overflow-hidden rounded-xl bg-white p-4 shadow transition hover:shadow-md"
    >
      {thumbnailUrl ? (
        <img
          src={thumbnailUrl}
          alt={title}
          width="400"
          height="300"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
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
