import { useState } from "react";

import SidebarFilter from "../components/features/metadata/SidebarFilter.jsx";
import ItemGrid from "../components/features/metadata/ItemGrid.jsx";
import PreviewModal from "../components/features/metadata/PreviewModal.jsx";
import ConfirmDelete from "../components/features/metadata/ConfirmDelete.jsx";
import MetadataEditor from "../components/features/metadata/MetadataEditor.jsx";
import BaseModal from "../components/features/metadata/BaseModal.jsx";
import SuccessPopup from "../components/features/metadata/SuccessPopup.jsx";

import Pagination from "../components/ui/Pagination.jsx";
import useMetadata from "../hooks/useMetadata";

export default function MetadataPages() {
  const {
    mode,
    setMode,
    selected,
    search,
    setSearch,
    kategori,
    setKategori,
    subKategori,
    setSubKategori,
    kategoriList,
    subKategoriList,
    currentData,
    currentPage,
    totalPages,
    setCurrentPage,
    handleSelect,
    handleDelete,
    handleUpdate,
    loading,
  } = useMetadata();

  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = (updatedData) => {
    handleUpdate(updatedData);
    setSuccessMessage("Metadata berhasil disimpan!");
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setSuccessMessage("Metadata berhasil dihapus!");
  };

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