import { useState, useEffect, useMemo } from "react";
import metadataData from "../data/metadata.json";

export default function useMetadata() {
  const [mode, setMode] = useState("idle");
  const [selectedId, setSelectedId] = useState(null);

  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("");
  const [subKategori, setSubKategori] = useState("");

  const [data, setData] = useState(metadataData);
  const [loading, setLoading] = useState(false);

  // SELECTED
  const selected = useMemo(() => {
    return data.find((item) => item._id === selectedId);
  }, [data, selectedId]);

  // FILTER LIST
  const kategoriList = [...new Set(data.map((d) => d.Kategori))];

  const subKategoriList = [
    ...new Set(
      data
        .filter((d) => (kategori ? d.Kategori === kategori : true))
        .map((d) => d["Sub Kategori"])
    ),
  ];

  // FILTER DATA
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

  // PAGINATION
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

  // 🔥 LOADING SIMULASI
  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search, kategori, subKategori, currentPage]);

  // ACTIONS
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

  return {
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
    loading, // 🔥 penting
  };
}