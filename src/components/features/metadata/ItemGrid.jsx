import ItemCard from "./ItemCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

export default function ItemGrid({ data, onSelect, loading }) {
  const gridClass =
    "grid grid-cols-1 gap-4 content-start sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5";

  if (loading) {
    return (
      <div className={gridClass}>
        {Array.from({ length: 10 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-[250px] rounded-xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500 shadow-sm flex items-center justify-center">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <div className={gridClass}>
      {data.map((item, index) => (
        <ItemCard
          key={item._id}
          item={item}
          onSelect={onSelect}
          priority={index < 2}
        />
      ))}
    </div>
  );
}


