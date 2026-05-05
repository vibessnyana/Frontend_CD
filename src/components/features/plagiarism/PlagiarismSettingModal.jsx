import { useState } from "react";

// ✅ BUTTON BARU
import ButtonCancel from "../../ui/button/ButtonCancel.jsx";
import ButtonCekPlagiarisme from "../../ui/button/ButtonCekPlagiarisme.jsx";

export default function PlagiarismSettingModal({
  preview,
  onCancel,
  onCheck,
}) {
  const [preset, setPreset] = useState("");
  const [manual, setManual] = useState({
    high: "",
    medium: "",
    low: "",
  });

  const presets = {
    strict: { high: 90, medium: 75, low: 60 },
    balanced: { high: 85, medium: 70, low: 55 },
    sensitive: { high: 80, medium: 65, low: 50 },
  };

  // ================= SUBMIT =================
  const handleSubmit = () => {
    if (preset) {
      onCheck({ type: "preset", value: presets[preset] });
      return;
    }

    if (manual.medium !== "") {
      onCheck({ type: "manual", value: manual });
      return;
    }

    alert("Pilih preset atau isi manual dulu!");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-start pt-[80px]">

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/30" />

      {/* MODAL */}
      <div className="relative bg-white w-[440px] rounded-2xl shadow-xl flex flex-col max-h-[80vh]">

        {/* SCROLL AREA */}
        <div className="overflow-y-auto p-6">

          {/* CLOSE */}
          <button
            onClick={onCancel}
            className="absolute top-3 right-4 text-gray-400 hover:text-red-500"
          >
            ✕
          </button>

          {/* IMAGE */}
          {preview && (
            <img
              src={preview}
              className="w-full h-[140px] object-cover rounded-lg mb-4"
            />
          )}

          {/* TITLE */}
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Batas Maksimum Kemiripan (%)
          </h2>

          {/* DESC */}
          <p className="text-xs text-gray-500 leading-relaxed mb-5">
            Jika hasil melebihi nilai ini, karya tidak dapat diverifikasi.
            <br />
            Anda dapat memilih <span className="font-medium">preset otomatis</span> atau
            mengatur nilai secara <span className="font-medium">manual</span>.
            <br />
            <span className="text-xs text-gray-400">
              (Cukup pilih salah satu saja)
            </span>
          </p>

          {/* PRESET */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Preset
            </label>

            <select
              value={preset}
              onChange={(e) => {
                setPreset(e.target.value);
                setManual({ high: "", medium: "", low: "" });
              }}
              className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="">Pilih preset...</option>
              <option value="strict">Strict</option>
              <option value="balanced">Balanced</option>
              <option value="sensitive">Sensitive</option>
            </select>

            {preset && (
              <p className="text-xs text-gray-400 mt-2">
                High: {presets[preset].high}% • Medium:{" "}
                {presets[preset].medium}% • Low: {presets[preset].low}%
              </p>
            )}
          </div>

          {/* MANUAL */}
          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Manual
            </label>

            <div className="grid grid-cols-3 gap-3">
              <input
                type="number"
                placeholder="High"
                value={manual.high}
                onChange={(e) => {
                  setManual({ ...manual, high: e.target.value });
                  setPreset("");
                }}
                className="border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="number"
                placeholder="Medium"
                value={manual.medium}
                onChange={(e) => {
                  setManual({ ...manual, medium: e.target.value });
                  setPreset("");
                }}
                className="border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />

              <input
                type="number"
                placeholder="Low"
                value={manual.low}
                onChange={(e) => {
                  setManual({ ...manual, low: e.target.value });
                  setPreset("");
                }}
                className="border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* ================= BUTTON ================= */}
        <div className="border-t p-4 flex justify-end gap-3 bg-white rounded-b-2xl">

          {/* CANCEL */}
          <ButtonCancel onClick={onCancel} />

          {/* CEK */}
          <ButtonCekPlagiarisme onClick={handleSubmit} />

        </div>
      </div>
    </div>
  );
}