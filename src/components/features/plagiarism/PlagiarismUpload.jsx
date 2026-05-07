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
    handleFile(e.dataTransfer.files[0]);
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
        w-full h-[400px]
        rounded-2xl border-2 border-dashed
        flex items-center justify-center
        cursor-pointer transition-all duration-200
        shadow-sm hover:shadow-md
        ${
          dragging
            ? "border-red-400 bg-red-50 ring-4 ring-red-100"
            : "border-gray-300 bg-white hover:border-red-400 hover:bg-red-50/30"
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
            alt="preview"
            className="max-h-full max-w-full object-contain rounded-xl shadow"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-50 mb-4 shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8 text-red-500"
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

          <p className="text-base font-semibold text-gray-700">
            Upload gambar
          </p>

          <p className="text-sm text-gray-400 mt-1">
            Drag & drop atau klik untuk memilih file
          </p>

          <p className="text-xs text-gray-400 mt-3">
            Format: JPG, PNG, WEBP
          </p>
        </div>
      )}
    </div>
  );
}
