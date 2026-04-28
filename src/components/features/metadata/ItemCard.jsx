export default function ItemCard({ data, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-md p-3 cursor-pointer hover:scale-105 transition"
    >
      <img
        src="https://via.placeholder.com/300"
        className="rounded-lg mb-2"
      />

      <h3 className="font-semibold">{data["Judul KI"]}</h3>
      <p className="text-sm text-gray-500">{data["Sub Kategori"]}</p>
    </div>
  );
}