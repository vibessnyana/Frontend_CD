import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import FilterPanel from "../features/metadata/FilterPanel.jsx";
import MetadataList from "../features/metadata/MetadataList.jsx";
import MetadataPreview from "../features/metadata/MetadataPreview.jsx";
import MetadataForm from "../features/metadata/MetadataForm.jsx";
import DeleteModal from "../features/metadata/DeleteModal.jsx";
import SuccessModal from "../features/metadata/SuccessModal.jsx";
import SearchBar from "../features/metadata/SearchBar.jsx";
import ModalWrapper from "../features/metadata/ModalWrapper.jsx";

import logo from "../assets/logo1.png";

export default function MetadataPages() {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("idle");

  const navigate = useNavigate();
  const location = useLocation(); // 🔥 buat active menu

  const dummyData = [
    {
      _id: "1",
      "Judul KI": "Lorem ipsum risus",
      Deskripsi:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      "Sub Kategori": "Ilustrasi Digital",
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
        <FilterPanel />

        {/* RIGHT CONTENT */}
        <div className="flex-1">

          {/* SEARCH */}
          <SearchBar onSearch={() => {}} />

          {/* CARD LIST */}
          <MetadataList
            data={dummyData}
            onSelect={(item) => {
              setSelected(item);
              setMode("preview");
            }}
          />

        </div>
      </div>

      {/* ================= PREVIEW MODAL ================= */}
      {mode === "preview" && (
        <ModalWrapper>
          <MetadataPreview
            data={selected}
            onEdit={() => setMode("edit")}
            onDelete={() => setMode("delete")}
          />
        </ModalWrapper>
      )}

      {/* ================= EDIT MODAL ================= */}
      {mode === "edit" && (
        <ModalWrapper>
          <MetadataForm
            data={selected}
            onSave={() => setMode("success")}
            onCancel={() => setMode("preview")}
          />
        </ModalWrapper>
      )}

      {/* ================= DELETE ================= */}
      {mode === "delete" && (
        <DeleteModal
          onCancel={() => setMode("preview")}
          onConfirm={() => setMode("success")}
        />
      )}

      {/* ================= SUCCESS ================= */}
      {mode === "success" && (
        <SuccessModal
          text="Update successful"
          onClose={() => setMode("idle")}
        />
      )}
    </div>
  );
}