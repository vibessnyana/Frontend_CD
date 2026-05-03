import { useState, useEffect } from "react";

function Row({ label, children }) {
  return (
    <div className="flex items-start gap-4 py-2">
      <div className="w-[140px] text-gray-400 text-sm">
        {label}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default function MetadataEditor({ data, onSave, onCancel }) {
  const [form, setForm] = useState({});

  useEffect(() => {
    if (data) {
      setForm({
        "Judul KI": data["Judul KI"] || "",
        Deskripsi: data.Deskripsi || "",
        ki_id: data.ki_id || "",
        ki_uuid: data.ki_uuid || "",
        Kategori: data.Kategori || "",
        "Sub Kategori": data["Sub Kategori"] || "",
        "Kategori HC": data["Kategori HC"] || "",
        "Sub Kategori HC": data["Sub Kategori HC"] || "",
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const inputStyle =
    "w-full border border-gray-200 rounded-md px-3 py-2 text-sm outline-none bg-gray-50 shadow-inner focus:ring-2 focus:ring-blue-400";

  return (
    <div className="bg-white w-[600px] rounded-2xl shadow-xl overflow-hidden">
      <div className="h-[80vh] overflow-y-auto p-6">

        <h2 className="text-lg font-semibold mb-4">Edit Metadata</h2>

        <Row label="Judul">
          <input
            value={form["Judul KI"] || ""}
            onChange={(e) => handleChange("Judul KI", e.target.value)}
            className={inputStyle}
          />
        </Row>

        <Row label="Deskripsi">
          <textarea
            value={form.Deskripsi || ""}
            onChange={(e) => handleChange("Deskripsi", e.target.value)}
            className={inputStyle}
          />
        </Row>

        <div className="border-t my-4"></div>

        <Row label="KI ID">
          <input value={form.ki_id || ""} onChange={(e) => handleChange("ki_id", e.target.value)} className={inputStyle} />
        </Row>

        <Row label="UUID">
          <input value={form.ki_uuid || ""} onChange={(e) => handleChange("ki_uuid", e.target.value)} className={inputStyle} />
        </Row>

        <Row label="Kategori">
          <input value={form.Kategori || ""} onChange={(e) => handleChange("Kategori", e.target.value)} className={inputStyle} />
        </Row>

        <Row label="Sub Kategori">
          <input value={form["Sub Kategori"] || ""} onChange={(e) => handleChange("Sub Kategori", e.target.value)} className={inputStyle} />
        </Row>

        <Row label="Kategori HC">
          <input value={form["Kategori HC"] || ""} onChange={(e) => handleChange("Kategori HC", e.target.value)} className={inputStyle} />
        </Row>

        <Row label="Sub Kategori HC">
          <input value={form["Sub Kategori HC"] || ""} onChange={(e) => handleChange("Sub Kategori HC", e.target.value)} className={inputStyle} />
        </Row>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">

          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </button>

          <button
            onClick={() => onSave(form)}
            className="px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600 transition"
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}