import ButtonAction from "../../ui/Button/ButtonAction.jsx";

export default function ErrorPopup({ text, onClose }) {
  return (
    <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 text-center">

      {/* ICON ❌ */}
      <div className="text-red-500 text-4xl mb-3">
        ✖
      </div>

      {/* TEXT */}
      <p className="text-gray-700 text-sm mb-6">
        {text}
      </p>

      {/* BUTTON */}
      <ButtonAction
        onClick={onClose}
        className="!bg-red-500 hover:!bg-red-600"
      >
        Tutup
      </ButtonAction>

    </div>
  );
}