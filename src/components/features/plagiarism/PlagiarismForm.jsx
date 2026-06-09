import { useState } from "react";

import ButtonCancel from "../../ui/Button/ButtonCancel.jsx";
import ButtonSave from "../../ui/Button/ButtonSave.jsx";
import { saveReportToLocalStorage } from "../../../services/ReportStorageService.jsx";

const initialForm = {
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

function buildReportPayload({ checkId, report, resultPercent, preview }) {
  if (!report) return null;

  return {
    ...report,
    check_id: checkId || report.check_id || null,
    result_percent: resultPercent,
    uploaded_image_url:
      preview ||
      report.uploaded_image_url ||
      report.uploadedImageUrl ||
      report.image_url ||
      report.imageUrl ||
      "",
    saved_at: new Date().toISOString(),
  };
}

export default function PlagiarismForm({
  checkId,
  report,
  resultPercent,
  preview,
  onSubmit,
  onCancel,
  isSubmitting = false,
}) {
  const [values, setValues] = useState(initialForm);

  const updateField = (field) => (event) => {
    setValues((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    if (!checkId) return alert("Check ID tidak ditemukan.");
    if (!values.title.trim()) return alert("Judul KI wajib diisi");

    const normalizedValues = normalizePayload(values);

    const reportPayload = buildReportPayload({
      checkId,
      report,
      resultPercent,
      preview,
    });

    if (reportPayload) {
      saveReportToLocalStorage({
        checkId,
        title: normalizedValues.title,
        imageUrl: reportPayload.uploaded_image_url,
        report: reportPayload,
      });
    }

    onSubmit?.({
      check_id: checkId,
      ...normalizedValues,
      report: reportPayload,
    });
  };

  return (
    <div className="w-full flex justify-center mt-6 px-4">
      <div className="w-full max-w-[650px] bg-white rounded-2xl shadow-md p-6 overflow-visible">
        <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
          Form Metadata
        </h3>

        <p className="mb-5 text-center text-xs text-gray-400">
          Check ID:{" "}
          <span className="font-medium text-gray-600">
            {checkId || "-"}
          </span>
        </p>

        <div className="space-y-4 max-h-[420px] overflow-y-auto px-2">
          <div>
            <label className="label">ID</label>
            <input className="input-compact" />
          </div>

          {/* KI ID */}
          <div>
            <label className="label">KI ID</label>
            <input className="input-compact" />
          </div>

          {/* KI UUID */}
          <div>
            <label className="label">KI UUID</label>
            <input className="input-compact break-words" />
          </div>

          {/* JUDUL */}
          <div>
            <label className="label">Judul</label>
            <textarea
              className="textarea-compact"
              value={values.title}
              onChange={updateField("title")}
            />
          </div>

          <div>
            <label className="label">Deskripsi</label>
            <textarea
              className="textarea-compact"
              value={values.description}
              onChange={updateField("description")}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label">Kategori</label>
              <input
                className="input-compact break-words"
                value={values.category}
                onChange={updateField("category")}
              />
            </div>

            <div>
              <label className="label">Sub Kategori</label>
              <input
                className="input-compact break-words"
                value={values.sub_category}
                onChange={updateField("sub_category")}
              />
            </div>

            <div>
              <label className="label">Kategori HC</label>
              <input
                className="input-compact break-words"
                value={values.copyright_category}
                onChange={updateField("copyright_category")}
              />
            </div>

            <div>
              <label className="label">Sub Kategori HC</label>
              <input
                className="input-compact break-words"
                value={values.copyright_sub_category}
                onChange={updateField("copyright_sub_category")}
              />
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

