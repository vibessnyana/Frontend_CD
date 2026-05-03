import { useState, useRef } from "react";

export default function PlagiarismUpload({ preview, setFile, setPreview }) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Hanya file gambar!");
      return;
    }

    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`
        w-full max-w-[800px] h-[400px]
        rounded-2xl border-2 border-dashed
        flex items-center justify-center
        cursor-pointer transition-all duration-200
        shadow-md hover:shadow-lg   /* 🔥 SHADOW */
        ${
          dragging
            ? "border-red-400 bg-red-50"
            : "border-gray-300 bg-white hover:border-red-400 hover:bg-gray-50"
        }
      `}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {preview ? (
        <div className="w-full h-full p-6 flex items-center justify-center">
          <img
            src={preview}
            className="max-h-full max-w-full object-contain rounded-xl shadow"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">

          {/* 🔥 ICON SVG (LEBIH PROFESSIONAL) */}
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 mb-4 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16l4-4a3 3 0 014 0l4 4m-1-1l1-1a3 3 0 014 0l2 2M3 16V6a2 2 0 012-2h6.5a2 2 0 011.4.6l4.5 4.5a2 2 0 01.6 1.4V16a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
          </div>

          {/* TITLE */}
          <p className="text-base font-semibold text-gray-700">
            Upload gambar
          </p>

          {/* SUBTEXT */}
          <p className="text-sm text-gray-400 mt-1">
            Drag & drop atau klik untuk memilih file
          </p>

        </div>
      )}
    </div>
  );
}