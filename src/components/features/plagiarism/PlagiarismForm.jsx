import { useState } from "react";
import ButtonCancel from "../../ui/button/ButtonCancel.jsx";
import ButtonSave from "../../ui/button/ButtonSave.jsx";

const initialForm = {
  ki_id: "",
  ki_uuid: "",
  title: "",
  description: "",
  category: "HAK CIPTA",
  sub_category: "karya seni",
  copyright_category: "karya seni",
  copyright_sub_category: "karya ilustrasi",
};

function normalizePayload(values) {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [
      key,
      typeof value === "string" && value.trim() === "" ? null : value.trim(),
    ])
  );
}

export default function PlagiarismForm({ checkId, onSubmit, onCancel, isSubmitting = false }) {
  const [values, setValues] = useState(initialForm);

  const updateField = (field) => (event) => {
    setValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (!checkId) return;
    if (!values.title.trim()) return alert("Judul KI wajib diisi");

    onSubmit?.({
      check_id: checkId,
      ...normalizePayload(values),
    });
  };

  return (
    <div className="w-full flex justify-center mt-6 px-4">
      <div className="w-full max-w-[650px] bg-white rounded-2xl shadow-md p-6 overflow-visible">
        <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
          Form Metadata
        </h3>

        <p className="mb-5 text-center text-xs text-gray-400">
          Check ID: <span className="font-medium text-gray-600">{checkId || "-"}</span>
        </p>

        <div className="space-y-4 max-h-[420px] overflow-y-auto px-2">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">KI ID</label>
              <input className="input-compact break-words" value={values.ki_id} onChange={updateField("ki_id")} />
            </div>

            <div>
              <label className="label">KI UUID</label>
              <input className="input-compact break-words" value={values.ki_uuid} onChange={updateField("ki_uuid")} />
            </div>
          </div>

          <div>
            <label className="label">Judul KI</label>
            <textarea className="textarea-compact" value={values.title} onChange={updateField("title")} />
          </div>

          <div>
            <label className="label">Deskripsi</label>
            <textarea className="textarea-compact" value={values.description} onChange={updateField("description")} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Kategori</label>
              <input className="input-compact break-words" value={values.category} onChange={updateField("category")} />
            </div>

            <div>
              <label className="label">Sub Kategori</label>
              <input className="input-compact break-words" value={values.sub_category} onChange={updateField("sub_category")} />
            </div>

            <div>
              <label className="label">Kategori HC</label>
              <input className="input-compact break-words" value={values.copyright_category} onChange={updateField("copyright_category")} />
            </div>

            <div>
              <label className="label">Sub Kategori HC</label>
              <input className="input-compact break-words" value={values.copyright_sub_category} onChange={updateField("copyright_sub_category")} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-5">
          <ButtonCancel onClick={isSubmitting ? undefined : onCancel} />
          <ButtonSave onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan Metadata"}
          </ButtonSave>
        </div>
      </div>
    </div>
  );
}

