export default function SkeletonCard() {
  return (
    <div className="h-full bg-white rounded-xl shadow p-4 animate-pulse overflow-hidden">
      <div className="h-[150px] bg-gray-200 rounded-md mb-3"></div>

      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>

      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>

      <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
}
