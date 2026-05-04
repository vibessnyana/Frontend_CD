import Button from "../../ui/Button.jsx";

export default function SuccessPopup({ text, onClose }) {
  return (
    <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 text-center">

      <div className="text-green-500 text-4xl mb-3">
        ✔
      </div>

      <p className="text-gray-700 text-sm mb-6">
        {text}
      </p>

      <Button variant="primary" onClick={onClose}>
        OK
      </Button>

    </div>
  );
}