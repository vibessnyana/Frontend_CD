import SimilarityItem from "./SimilarityItem.jsx";

export default function SimilarityList({ title, data, onSelect }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <span className="text-xs text-gray-400">{data.length} hasil</span>
      </div>

      {data.length > 0 ? (
        <div className="space-y-2">
          {data.map((item, i) => (
            <SimilarityItem
              key={`${title}-${i}`}
              {...item}
              onClick={() => onSelect?.(item)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-3">
          <p className="text-xs text-gray-400">Tidak ada hasil.</p>
        </div>
      )}
    </section>
  );
}
