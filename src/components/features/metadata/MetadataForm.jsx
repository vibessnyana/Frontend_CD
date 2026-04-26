import { useState } from "react";

export default function MetadataForm({ data, onSave, onCancel }) {
  const [form, setForm] = useState(data);

  return (
    <div className="bg-white p-6 rounded-xl shadow w-[500px]">
      <img
        src="https://via.placeholder.com/400"
        className="mb-4 rounded-lg"
      />

      <input
        value={form["Judul KI"]}
        onChange={(e) =>
          setForm({ ...form, "Judul KI": e.target.value })
        }
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        value={form["Deskripsi"]}
        onChange={(e) =>
          setForm({ ...form, Deskripsi: e.target.value })
        }
        className="w-full mb-3 p-2 border rounded"
      />

      <div className="flex justify-end gap-3">
        <button onClick={onCancel}>Cancel</button>

        <button
          onClick={() => onSave(form)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  );
}