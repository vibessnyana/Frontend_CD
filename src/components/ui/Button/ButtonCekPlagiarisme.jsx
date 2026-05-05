export default function ButtonCekPlagiarisme({
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        px-6 py-2.5 rounded-lg text-sm font-semibold
        bg-green-500 text-white
        hover:bg-green-600
        shadow-md
        transition-all duration-200
      "
    >
      Cek Plagiarisme
    </button>
  );
}