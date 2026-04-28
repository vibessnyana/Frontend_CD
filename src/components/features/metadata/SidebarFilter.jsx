export default function SidebarFilter() {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-[250px]">
      <h2 className="font-semibold mb-4">Filters</h2>

      <select className="border w-full mb-2 p-2">
        <option>Jenis Karya</option>
      </select>

      <select className="border w-full mb-2 p-2">
        <option>Kategori</option>
      </select>

      <select className="border w-full mb-4 p-2">
        <option>Tahun</option>
      </select>

      <button className="bg-red-500 text-white w-full py-2 rounded">
        Apply Filter
      </button>
    </div>
  );
}