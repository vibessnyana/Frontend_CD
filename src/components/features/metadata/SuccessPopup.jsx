export default function SuccessPopup({ text, onClose }) {
  return (
    <div className="bg-white w-[400px] rounded-2xl shadow-xl p-6 text-center">

      {/* ICON */}
      <div className="text-green-500 text-4xl mb-3">
        ✔
      </div>

      {/* TEXT */}
      <p className="text-gray-700 text-sm mb-6">
        {text}
      </p>

      {/* BUTTON */}
      <button
        onClick={onClose}
        className="px-5 py-2 rounded-md text-sm 
                   bg-blue-500 text-white 
                   hover:bg-blue-600 
                   transition"
      >
        OK
      </button>

    </div>
  );
}