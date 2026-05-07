export default function SimilarityItem({
  img,
  percent,
  title,
  sourceUrl,
  owner,
  onClick,
}) {
  const label = owner || sourceUrl;

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 rounded-lg border border-gray-100 bg-white p-2.5 shadow-sm cursor-pointer hover:border-red-100 hover:bg-red-50/30 transition"
    >
      <div className="w-14 h-14 rounded-md overflow-hidden bg-gray-100 shrink-0">
        {img ? (
          <img
            src={img}
            alt={title || "Similarity result"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
            N/A
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-gray-700 truncate">
            {title || "Tanpa judul"}
          </p>

          <span className="shrink-0 rounded-md bg-yellow-50 px-2 py-1 text-xs font-semibold text-yellow-600">
            {percent}%
          </span>
        </div>

        {label && (
          <p className="mt-1 text-xs text-gray-400 truncate">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}
