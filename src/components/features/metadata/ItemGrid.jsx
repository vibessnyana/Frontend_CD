import ItemCard from "./ItemCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

export default function ItemGrid({ data, onSelect, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-5 grid-rows-2 auto-rows-[250px] gap-4 content-start">
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
    <div className="grid grid-cols-5 grid-rows-2 auto-rows-[250px] gap-4 content-start">
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
