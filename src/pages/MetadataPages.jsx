import { useState, useEffect, useMemo } from "react";
import metadataData from "../data/metadata.json";

import SidebarFilter from "../components/features/metadata/SidebarFilter.jsx";
import ItemGrid from "../components/features/metadata/ItemGrid.jsx";
import PreviewModal from "../components/features/metadata/PreviewModal.jsx";
import ConfirmDelete from "../components/features/metadata/ConfirmDelete.jsx";
import MetadataEditor from "../components/features/metadata/MetadataEditor.jsx";
import BaseModal from "../components/features/metadata/BaseModal.jsx";
import SuccessPopup from "../components/features/metadata/SuccessPopup.jsx";
import Pagination from "../components/ui/Pagination.jsx";

export default function MetadataPages() {

  // ================= STATE =================
  const [mode, setMode] = useState("idle");
  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [subKategori, setSubKategori] = useState("");

  const [data, setData] = useState(metadataData);
  const [loading, setLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  // ================= SELECTED =================
  const selected = useMemo(() => {
    return data.find((item) => item._id === selectedId);
  }, [data, selectedId]);

  // ================= FILTER LIST =================
  const kategoriList = [...new Set(data.map((d) => d.Kategori))];

  const subKategoriList = [
    ...new Set(
      data
        .filter((d) => (kategori ? d.Kategori === kategori : true))
        .map((d) => d["Sub Kategori"])
    ),
  ];

  // ================= FILTER DATA =================
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

  // ================= PAGINATION =================
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, kategori, subKategori]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // ================= LOADING =================
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, kategori, subKategori, currentPage]);

  // ================= ACTIONS =================
  const handleSelect = (item) => {
    setSelectedId(item._id);
    setMode("preview");
  };

  const handleDelete = () => {
    setData((prev) =>
      prev.filter((item) => item._id !== selectedId)
    );
    setMode("idle");
  };

  const handleUpdate = (updatedData) => {
    setData((prev) =>
      prev.map((item) =>
        item._id === selectedId
          ? { ...item, ...updatedData }
          : item
      )
    );
    setMode("idle");
  };

  const handleSave = (updatedData) => {
    handleUpdate(updatedData);
    setSuccessMessage("Metadata berhasil disimpan!");
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setSuccessMessage("Metadata berhasil dihapus!");
  };

  // ================= UI =================
  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">

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

        {/* CONTENT */}
        <div className="flex-1">

          {/* SEARCH */}
          <div className="flex mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for Metadata Property"
              className="w-full px-4 py-2 border rounded-lg text-sm outline-none bg-white"
            />
          </div>

          {/* GRID */}
          <ItemGrid
            data={currentData || []}
            onSelect={handleSelect}
            loading={loading}
          />

          {/* PAGINATION */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />

        </div>
      </div>

      {/* PREVIEW */}
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

      {/* DELETE */}
      {mode === "delete" && selected && (
        <BaseModal onClose={() => setMode("idle")}>
          <ConfirmDelete
            onConfirm={handleDeleteConfirm}
            onCancel={() => setMode("preview")}
          />
        </BaseModal>
      )}

      {/* EDIT */}
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

      {/* SUCCESS */}
      {successMessage && (
        <BaseModal onClose={() => setSuccessMessage("")}>
          <SuccessPopup
            text={successMessage}
            onClose={() => setSuccessMessage("")}
          />
        </BaseModal>
      )}

    </div>
  );
}