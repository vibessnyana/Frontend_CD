import ItemCard from "./ItemCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";

export default function ItemGrid({ data, onSelect, loading }) {

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  // 🔥 EMPTY STATE
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Data tidak ditemukan
      </div>
    );
  }

  // 🔥 NORMAL STATE
  return (
    <div className="grid grid-cols-4 gap-4">
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