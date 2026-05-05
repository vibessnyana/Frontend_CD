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
    <div className="bg-white p-4 rounded-xl shadow">

      <h2 className="text-base font-semibold mb-4">Filters</h2>

      <div className="space-y-3">

        {/* KATEGORI */}
        <select
          value={kategori}
          onChange={(e) => {
            setKategori(e.target.value);
            setSubKategori("");
          }}
          className="w-full border px-3 py-2 rounded-md text-sm text-gray-600"
        >
          <option value="">Jenis Karya</option>
          {kategoriList.map((k, i) => (
            <option key={i} value={k}>{k}</option>
          ))}
        </select>

        {/* SUB KATEGORI */}
        <select
          value={subKategori}
          onChange={(e) => setSubKategori(e.target.value)}
          className="w-full border px-3 py-2 rounded-md text-sm text-gray-600"
        >
          <option value="">Kategori</option>
          {subKategoriList.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        {/* 🔥 RESET BUTTON */}
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