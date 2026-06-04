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
    <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="mb-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
          Refine
        </p>
        <h2 className="text-base font-semibold text-gray-800">Filters</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] lg:grid-cols-1">
        <select
          aria-label="filter jenis karya"
          value={kategori}
          onChange={(e) => {
            setKategori(e.target.value);
            setSubKategori("");
          }}
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 outline-none focus:border-red-400 focus:bg-white"
        >
          <option value="">Jenis Karya</option>
          {kategoriList.map((k, i) => (
            <option key={i} value={k}>{k}</option>
          ))}
        </select>

        <select
          aria-label="filter kategori"
          value={subKategori}
          onChange={(e) => setSubKategori(e.target.value)}
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600 outline-none focus:border-red-400 focus:bg-white"
        >
          <option value="">Kategori</option>
          {subKategoriList.map((s, i) => (
            <option key={i} value={s}>{s}</option>
          ))}
        </select>

        <div className="flex justify-end sm:items-start lg:pt-1">
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

