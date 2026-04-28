export default function SuccessPopup({ text, onClose }) {
  return (
    <div className="bg-white p-6 rounded-xl text-center">
      <h2 className="text-green-600 text-xl mb-2">✔</h2>
      <p className="mb-4">{text}</p>

      <button
        onClick={onClose}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        OK
      </button>
    </div>
  );
}