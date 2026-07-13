export default function SkeletonCard() {
  const shimmer =
    "relative overflow-hidden bg-gray-200 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.4s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

  return (
    <div className="min-h-[245px] overflow-hidden rounded-xl bg-white p-4 shadow">
      <div className={`mb-3 h-[145px] w-full rounded-md ${shimmer}`} />

      <div className={`mb-2 h-4 w-3/4 rounded ${shimmer}`} />

      <div className={`mb-3 h-3 w-2/3 rounded ${shimmer}`} />

      <div className={`mb-2 h-3 w-1/2 rounded ${shimmer}`} />
      <div className={`h-3 w-1/3 rounded ${shimmer}`} />
    </div>
  );
}
