export default function ButtonConfirmDelete({
  children = "Yes",
  onClick,
  disabled = false,
}) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        px-5 py-2.5
        bg-green-500 text-white
        rounded-lg
        font-medium text-sm
        hover:bg-green-600
        active:scale-95
        transition
        ${
          disabled
            ? "opacity-70 cursor-not-allowed active:scale-100 hover:bg-gray-200"
            : ""
        }
      `}
    >
      {disabled ? "Menghapus..." : children}
    </button>
  );
}