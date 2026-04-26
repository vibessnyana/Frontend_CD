export default function FilterPanel({ filters, setFilters }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow w-[250px]">
      <h3 className="font-semibold mb-4">Filters</h3>

      <select
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setFilters({ ...filters, jenis: e.target.value })
        }
      >
        <option value="">Jenis Karya</option>
        <option value="Ilustrasi">Ilustrasi</option>
        <option value="Logo">Logo</option>
      </select>

      <select
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setFilters({ ...filters, kategori: e.target.value })
        }
      >
        <option value="">Kategori</option>
        <option value="Desain">Desain</option>
        <option value="Visual">Visual</option>
      </select>

      <select
        className="w-full mb-3 p-2 border rounded"
        onChange={(e) =>
          setFilters({ ...filters, tahun: e.target.value })
        }
      >
        <option value="">Tahun</option>
        <option value="2025">2025</option>
      </select>

      <button className="w-full bg-red-600 text-white py-2 rounded-lg mt-3">
        Apply Filter
      </button>
    </div>
  );
}