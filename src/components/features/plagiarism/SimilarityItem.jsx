export default function SimilarityItem({ img, percent }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <img src={img} className="w-14 h-14 object-cover rounded-md" />
      <span className="text-sm font-medium">{percent}%</span>
    </div>
  );
}