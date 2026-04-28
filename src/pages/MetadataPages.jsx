import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import SidebarFilter from "../components/features/metadata/SidebarFilter.jsx";
import ItemGrid from "../components/features/metadata/ItemGrid.jsx";
import PreviewModal from "../components/features/metadata/PreviewModal.jsx";
import MetadataEditor from "../components/features/metadata/MetadataEditor.jsx";
import ConfirmDelete from "../components/features/metadata/ConfirmDelete.jsx";
import SuccessPopup from "../components/features/metadata/SuccessPopup.jsx";
import TopSearch from "../components/features/metadata/TopSearch.jsx";
import BaseModal from "../components/features/metadata/BaseModal.jsx";

import logo from "../assets/logo1.png";

export default function MetadataPages() {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("idle");

  const navigate = useNavigate();
  const location = useLocation();

  const dummyData = [
    {
      _id: "1",
      "Judul KI": "Lorem ipsum risus",
      Deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sub Kategori": "Ilustrasi Digital",
    },
    {
      _id: "2",
      "Judul KI": "Lorem ipsum dolor",
      Deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sub Kategori": "Desain Grafis",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">

      {/* ================= NAVBAR ================= */}
      <div className="w-full bg-red-600 h-[60px] flex items-center px-10 text-white">

        {/* LOGO */}
        <div className="flex-1 flex items-center">
          <img src={logo} className="h-10 object-contain" />
        </div>

        {/* MENU */}
        <div className="flex-1 flex justify-center gap-12 text-sm font-medium">

          <p
            onClick={() => navigate("/")}
            className={`cursor-pointer transition ${
              location.pathname === "/"
                ? "underline font-semibold"
                : "hover:underline"
            }`}
          >
            Cek plagiarisme
          </p>

          <p
            onClick={() => navigate("/metadata")}
            className={`cursor-pointer transition ${
              location.pathname === "/metadata"
                ? "underline font-semibold"
                : "hover:underline"
            }`}
          >
            Search metadata
          </p>

        </div>

        {/* PROFILE */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
            <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
            <span className="text-sm">John Doe</span>
          </div>
        </div>

      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex gap-6 p-6">

        {/* LEFT FILTER */}
        <SidebarFilter />

        {/* RIGHT CONTENT */}
        <div className="flex-1">

          {/* SEARCH */}
          <TopSearch onSearch={() => {}} />

          {/* GRID */}
          <ItemGrid
            data={dummyData}
            onSelect={(item) => {
              setSelected(item);
              setMode("preview");
            }}
          />

        </div>
      </div>

      {/* ================= PREVIEW ================= */}
      {mode === "preview" && (
        <BaseModal>
          <PreviewModal
            data={selected}
            onEdit={() => setMode("edit")}
            onDelete={() => setMode("delete")}
          />
        </BaseModal>
      )}

      {/* ================= EDIT ================= */}
      {mode === "edit" && (
        <BaseModal>
          <MetadataEditor
            data={selected}
            onSave={() => setMode("success")}
            onCancel={() => setMode("preview")}
          />
        </BaseModal>
      )}

      {/* ================= DELETE ================= */}
      {mode === "delete" && (
        <BaseModal>
          <ConfirmDelete
            onCancel={() => setMode("preview")}
            onConfirm={() => setMode("success")}
          />
        </BaseModal>
      )}

      {/* ================= SUCCESS ================= */}
      {mode === "success" && (
        <BaseModal>
          <SuccessPopup
            text="Update successful"
            onClose={() => setMode("idle")}
          />
        </BaseModal>
      )}

    </div>
  );
}