import ButtonReset from "../../ui/Button/ButtonReset.jsx";

export default function SidebarFilter({
  kategori = "",
  setKategori = () => {},
  subKategori = "",
  setSubKategori = () => {},
  kategoriList = [],
  subKategoriList = [],
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
          Refine
        </p>
        <h2 className="text-base font-semibold text-gray-800">Filters</h2>
      </div>

      <div className="space-y-3">
        <select
          value={kategori}
          onChange={(e) => {
            setKategori(e.target.value);
            setSubKategori("");
          }}
          className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-600 outline-none focus:bg-white focus:border-red-400"
        >
          <option value="">Jenis Karya</option>
          {kategoriList.map((k, i) => (
            <option key={i} value={k}>{k}</option>
          ))}
        </select>

        <select
          value={subKategori}
          onChange={(e) => setSubKategori(e.target.value)}
          className="w-full border border-gray-200 bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-600 outline-none focus:bg-white focus:border-red-400"
        >
          <option value="">Kategori</option>
          {subKategoriList.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <div className="flex justify-end pt-1">
          <ButtonReset
            onClick={() => {
              setKategori("");
              setSubKategori("");
            }}
            className="text-xs px-3 py-1.5"
          >
            Reset
          </ButtonReset>
        </div>
      </div>
    </div>
  );
}
