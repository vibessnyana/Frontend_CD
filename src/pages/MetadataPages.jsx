import { useState, useEffect, useMemo } from "react";
import metadataData from "../data/metadata.json";

import SidebarFilter from "../components/features/metadata/SidebarFilter.jsx";
import ItemGrid from "../components/features/metadata/ItemGrid.jsx";
import PreviewModal from "../components/features/metadata/PreviewModal.jsx";
import ConfirmDelete from "../components/features/metadata/ConfirmDelete.jsx";
import MetadataEditor from "../components/features/metadata/MetadataEditor.jsx";
import BaseModal from "../components/features/metadata/BaseModal.jsx";
import SuccessPopup from "../components/features/metadata/SuccessPopup.jsx";
import ErrorPopup from "../components/features/metadata/ErrorPopup.jsx";
import Pagination from "../components/ui/Pagination.jsx";

export default function MetadataPages() {
  const [mode, setMode] = useState("idle");
  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [subKategori, setSubKategori] = useState("");

  const [data, setData] = useState(metadataData);
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const selected = useMemo(() => {
    return data.find((item) => item._id === selectedId);
  }, [data, selectedId]);

  const kategoriList = [...new Set(data.map((d) => d.Kategori))];

  const subKategoriList = [
    ...new Set(
      data
        .filter((d) => (kategori ? d.Kategori === kategori : true))
        .map((d) => d["Sub Kategori"])
    ),
  ];

  const filteredData = data.filter((item) => {
    const matchSearch = Object.values(item)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchKategori = kategori ? item.Kategori === kategori : true;
    const matchSub = subKategori ? item["Sub Kategori"] === subKategori : true;

    return matchSearch && matchKategori && matchSub;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [search, kategori, subKategori]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, kategori, subKategori, currentPage]);

  const handleSelect = (item) => {
    setSelectedId(item._id);
    setMode("preview");
  };

  const handleDelete = () => {
    setData((prev) => prev.filter((item) => item._id !== selectedId));
    setMode("idle");
  };

  const handleUpdate = (updatedData) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === selectedId ? { ...item, ...updatedData } : item
      )
    );
    setMode("idle");
  };

  const handleSave = (updatedData) => {
    try {
      const isError = Math.random() < 0.3;

      if (isError) {
        throw new Error("Gagal menyimpan metadata!");
      }

      handleUpdate(updatedData);
      setSuccessMessage("Metadata berhasil disimpan!");
    } catch (err) {
      setErrorMessage(err.message || "Terjadi kesalahan!");
    }
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setSuccessMessage("Metadata berhasil dihapus!");
  };

  return (
    <div className="w-full h-[calc(100vh-60px)] overflow-hidden bg-gray-100 flex flex-col">
      <div className="h-full px-6 pt-5 pb-4 flex flex-col">
        <div className="flex-1 mb-4  flex gap-4">
          <div className="w-[360px] shrink-0">
            <SidebarFilter
              kategori={kategori}
              setKategori={setKategori}
              subKategori={subKategori}
              setSubKategori={setSubKategori}
              kategoriList={kategoriList}
              subKategoriList={subKategoriList}
            />
          </div>

          <div className="flex-1 min-w-0 flex flex-col">
            <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for Metadata Property"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-gray-50 focus:bg-white focus:border-red-400"
              />
            </div>
            <div className="min-h-0 mb-4 p-4 inset-shadow-2xs rounded-xl border border-gray-100 bg-white">
              <ItemGrid
                data={currentData || []}
                onSelect={handleSelect}
                loading={loading}
              />
            </div>
          </div>
        </div>

        <div className="ml-[316px] -mt-3 h-10 shrink-0 flex items-center justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            className="mt-0"
          />
        </div>
      </div>

      {mode === "preview" && selected && (
        <BaseModal onClose={() => setMode("idle")}>
          <PreviewModal
            data={selected}
            onDelete={() => setMode("delete")}
            onEdit={() => setMode("edit")}
            onClose={() => setMode("idle")}
          />
        </BaseModal>
      )}

      {mode === "delete" && selected && (
        <BaseModal onClose={() => setMode("idle")}>
          <ConfirmDelete
            onConfirm={handleDeleteConfirm}
            onCancel={() => setMode("preview")}
          />
        </BaseModal>
      )}

      {mode === "edit" && selected && (
        <BaseModal onClose={() => setMode("idle")}>
          <MetadataEditor
            key={selected._id}
            data={selected}
            onCancel={() => setMode("preview")}
            onSave={handleSave}
          />
        </BaseModal>
      )}

      {successMessage && (
        <BaseModal onClose={() => setSuccessMessage("")}>
          <SuccessPopup
            text={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        </BaseModal>
      )}

      {errorMessage && (
        <BaseModal onClose={() => setErrorMessage("")}>
          <ErrorPopup
            text={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        </BaseModal>
      )}
    </div>
  );
}
