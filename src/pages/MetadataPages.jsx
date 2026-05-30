import { useState, useEffect, useMemo } from "react";

import SidebarFilter from "../components/features/metadata/SidebarFilter.jsx";
import ItemGrid from "../components/features/metadata/ItemGrid.jsx";
import PreviewModal from "../components/features/metadata/PreviewModal.jsx";
import ConfirmDelete from "../components/features/metadata/ConfirmDelete.jsx";
import MetadataEditor from "../components/features/metadata/MetadataEditor.jsx";
import BaseModal from "../components/features/metadata/BaseModal.jsx";
import SuccessPopup from "../components/features/metadata/SuccessPopup.jsx";
import ErrorPopup from "../components/features/metadata/ErrorPopup.jsx";
import Pagination from "../components/ui/Pagination.jsx";

import {
  getMetadataList,
  updateMetadata,
  deleteMetadata,
} from "../services/MetadataService.jsx";

export default function MetadataPages() {
  const [mode, setMode] = useState("idle");
  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [subKategori, setSubKategori] = useState("");

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const getColumnCount = () => {
      const width = window.innerWidth;

      if (width >= 1536) return 5;
      if (width >= 1280) return 4;
      if (width >= 1024) return 3;
      if (width >= 640) return 2;

      return 1;
    };

    const updateItemsPerPage = () => {
      const rowsPerPage = 2;
      setItemsPerPage(getColumnCount() * rowsPerPage);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function fetchMetadata() {
      try {
        setLoading(true);

        const metadata = await getMetadataList();

        if (isMounted) {
          setData(metadata);
        }
      } catch (err) {
        if (isMounted) {
          setErrorMessage(err.message || "Gagal mengambil data metadata");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchMetadata();

    return () => {
      isMounted = false;
    };
  }, []);

  const selected = useMemo(() => {
    return data.find((item) => item._id === selectedId);
  }, [data, selectedId]);

  const kategoriList = useMemo(() => {
    return [
      ...new Set(
        data
          .map((d) => d.Kategori)
          .filter((item) => item && item.trim() !== "")
      ),
    ];
  }, [data]);

  const subKategoriList = useMemo(() => {
    return [
      ...new Set(
        data
          .filter((d) => (kategori ? d.Kategori === kategori : true))
          .map((d) => d["Sub Kategori"])
          .filter((item) => item && item.trim() !== "")
      ),
    ];
  }, [data, kategori]);

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchKategori = kategori ? item.Kategori === kategori : true;
      const matchSub = subKategori
        ? item["Sub Kategori"] === subKategori
        : true;

      return matchSearch && matchKategori && matchSub;
    });
  }, [data, search, kategori, subKategori]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, kategori, subKategori]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(totalPages, 1)));
  }, [totalPages]);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setPageLoading(true);

    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, kategori, subKategori, currentPage]);

  const handleSelect = (item) => {
    setSelectedId(item._id);
    setMode("preview");
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteMetadata(selectedId);

      setData((prev) => prev.filter((item) => item._id !== selectedId));
      setMode("idle");
      setSelectedId(null);
      setSuccessMessage("Metadata berhasil dihapus!");
    } catch (err) {
      setErrorMessage(err.message || "Gagal menghapus metadata");
    }
  };

  const handleSave = async (updatedData) => {
    try {
      const payload = {
        ...selected,
        ...updatedData,
      };

      const updatedMetadata = await updateMetadata(selectedId, payload);

      setData((prev) =>
        prev.map((item) =>
          item._id === selectedId
            ? {
                ...item,
                ...updatedMetadata,
                _id: item._id,
              }
            : item
        )
      );

      setMode("idle");
      setSuccessMessage("Metadata berhasil disimpan!");
    } catch (err) {
      setErrorMessage(err.message || "Gagal menyimpan metadata");
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-60px)] bg-gray-100">
      <div className="mx-auto flex min-h-[calc(100vh-60px)] w-full max-w-[1920px] flex-col px-4 py-5 sm:px-6">
        <div className="mb-4 flex flex-1 flex-col gap-4 lg:flex-row">
          <div className="w-full shrink-0 lg:w-72 xl:w-[360px]">
            <SidebarFilter
              kategori={kategori}
              setKategori={setKategori}
              subKategori={subKategori}
              setSubKategori={setSubKategori}
              kategoriList={kategoriList}
              subKategoriList={subKategoriList}
            />
          </div>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="mb-4 rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for Metadata Property"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-red-400 focus:bg-white"
              />
            </div>

            <div className="mb-4 min-h-[320px] rounded-xl border border-gray-100 bg-white p-4 inset-shadow-2xs">
              <ItemGrid
                data={currentData || []}
                onSelect={handleSelect}
                loading={loading || pageLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-center pb-1">
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
