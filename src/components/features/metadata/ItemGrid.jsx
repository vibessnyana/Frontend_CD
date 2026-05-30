import ItemCard from "./ItemCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

export default function ItemGrid({ data, onSelect, loading }) {
  const gridClass =
    "grid grid-cols-1 justify-center gap-4 content-start sm:grid-cols-[repeat(auto-fill,minmax(210px,260px))] sm:justify-start";

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
      {data.map((item) => (
        <ItemCard
          key={item._id}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
