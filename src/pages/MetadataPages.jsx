import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo1.png";

import SidebarFilter from "../components/features/metadata/SidebarFilter.jsx";
import ItemGrid from "../components/features/metadata/ItemGrid.jsx";
import PreviewModal from "../components/features/metadata/PreviewModal.jsx";
import ConfirmDelete from "../components/features/metadata/ConfirmDelete.jsx";
import MetadataEditor from "../components/features/metadata/MetadataEditor.jsx";
import BaseModal from "../components/features/metadata/BaseModal.jsx";

import metadataData from "../data/metadata.json";

export default function MetadataPages() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("idle");
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");

  const [kategori, setKategori] = useState("");
  const [subKategori, setSubKategori] = useState("");

  const [data, setData] = useState(metadataData);

  // 🔥 PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 🔥 FILTER LIST
  const kategoriList = [...new Set(data.map((d) => d.Kategori))];

  const subKategoriList = [
    ...new Set(
      data
        .filter((d) => (kategori ? d.Kategori === kategori : true))
        .map((d) => d["Sub Kategori"])
    ),
  ];

  // 🔍 FILTER + SEARCH
  const filteredData = data.filter((item) => {
    const matchSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchKategori = kategori
      ? item.Kategori === kategori
      : true;

    const matchSub = subKategori
      ? item["Sub Kategori"] === subKategori
      : true;

    return matchSearch && matchKategori && matchSub;
  });

  // 🔥 RESET PAGE SAAT FILTER
  useEffect(() => {
    setCurrentPage(1);
  }, [search, kategori, subKategori]);

  // 🔥 PAGINATION LOGIC
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // DELETE
  const handleDelete = () => {
    setData(data.filter((item) => item._id !== selected._id));
    setMode("idle");
  };

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">


      {/* ================= CONTENT ================= */}
      <div className="flex gap-4 px-6 pt-3 pb-6">

        {/* FILTER */}
        <div className="w-[200px]">
          <SidebarFilter
            kategori={kategori}
            setKategori={setKategori}
            subKategori={subKategori}
            setSubKategori={setSubKategori}
            kategoriList={kategoriList}
            subKategoriList={subKategoriList}
          />
        </div>

        {/* RIGHT */}
        <div className="flex-1">

          {/* 🔥 SEARCH BAR (FIX ICON) */}
          <div className="flex mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Metadata Property"
              className="flex-1 px-4 py-2 border rounded-l-lg text-sm outline-none bg-white"
            />

            <button className="bg-red-600 px-4 rounded-r-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.35-5.65a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          {/* GRID */}
          <ItemGrid
            data={currentData}
            onSelect={(item) => {
              setSelected(item);
              setMode("preview");
            }}
          />

          {/* ================= PAGINATION ================= */}
          <div className="flex justify-center mt-6 items-center gap-2 text-sm">

            {/* PREV */}
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded border ${
                currentPage === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {"<"}
            </button>

            {/* PAGE NUMBERS */}
            {(() => {
              const pages = [];
              const maxVisible = 5;

              let start = Math.max(currentPage - 2, 1);
              let end = Math.min(start + maxVisible - 1, totalPages);

              if (end - start < maxVisible - 1) {
                start = Math.max(end - maxVisible + 1, 1);
              }

              if (start > 1) {
                pages.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className="px-3 py-1 border rounded bg-white"
                  >
                    1
                  </button>
                );

                if (start > 2) pages.push(<span key="s">...</span>);
              }

              for (let i = start; i <= end; i++) {
                pages.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 rounded ${
                      currentPage === i
                        ? "bg-red-600 text-white"
                        : "bg-white border hover:bg-gray-100"
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              if (end < totalPages) {
                if (end < totalPages - 1) pages.push(<span key="e">...</span>);

                pages.push(
                  <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className="px-3 py-1 border rounded bg-white"
                  >
                    {totalPages}
                  </button>
                );
              }

              return pages;
            })()}

            {/* NEXT */}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded border ${
                currentPage === totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {">"}
            </button>

          </div>

        </div>
      </div>

      {/* ================= MODALS ================= */}
      {mode === "preview" && (
        <BaseModal onClose={() => setMode("idle")}>
          <PreviewModal
            data={selected}
            onDelete={() => setMode("delete")}
            onEdit={() => setMode("edit")}
            onClose={() => setMode("idle")}
          />
        </BaseModal>
      )}

      {mode === "delete" && (
        <BaseModal onClose={() => setMode("idle")}>
          <ConfirmDelete
            onConfirm={handleDelete}
            onCancel={() => setMode("preview")}
          />
        </BaseModal>
      )}

      {mode === "edit" && (
        <BaseModal onClose={() => setMode("idle")}>
          <MetadataEditor
            data={selected}
            onCancel={() => setMode("preview")}
            onSave={() => setMode("idle")}
          />
        </BaseModal>
      )}

    </div>
  );
}