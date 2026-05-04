import { useState } from "react";

const PRESETS = {
  strict: { high: 0.9, medium: 0.75, low: 0.6 },
  balanced: { high: 0.85, medium: 0.7, low: 0.55 },
  sensitive: { high: 0.8, medium: 0.65, low: 0.5 },
};

export default function PlagiarismPresetSelector({
  onChange,
}) {
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [manual, setManual] = useState({
    high: "",
    medium: "",
    low: "",
  });

  // ======================
  // HANDLE PRESET CLICK
  // ======================
  const handlePreset = (key) => {
    setSelectedPreset(key);
    setManual({ high: "", medium: "", low: "" }); // reset manual

    onChange({
      type: "preset",
      value: PRESETS[key],
    });
  };

  // ======================
  // HANDLE MANUAL INPUT
  // ======================
  const handleManual = (field, value) => {
    const updated = { ...manual, [field]: value };

    setManual(updated);
    setSelectedPreset(null); // reset preset

    onChange({
      type: "manual",
      value: updated,
    });
  };

  return (
    <div className="space-y-4">

      {/* ================= PRESET BUTTON ================= */}
      <div>
        <p className="text-sm font-semibold mb-2">Preset</p>

        <div className="flex gap-2">
          {Object.keys(PRESETS).map((key) => (
            <button
              key={key}
              onClick={() => handlePreset(key)}
              className={`
                px-3 py-1 rounded-full text-sm border
                ${selectedPreset === key
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-white text-gray-600 border-gray-300 hover:border-red-400"
                }
              `}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MANUAL INPUT ================= */}
      <div>
        <p className="text-sm font-semibold mb-2">Manual</p>

        <div className="grid grid-cols-3 gap-2">
          {["low", "medium", "high"].map((field) => (
            <input
              key={field}
              type="number"
              step="0.01"
              placeholder={field}
              value={manual[field]}
              onChange={(e) => handleManual(field, e.target.value)}
              className="border rounded-md p-2 text-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
}