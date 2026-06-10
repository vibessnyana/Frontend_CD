export default function ButtonConfirmDelete({
  children = "Yes",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="
        px-5 py-2.5
        bg-green-500 text-white
        rounded-lg
        font-medium text-sm
        hover:bg-green-600
        active:scale-95
        transition
      "
    >
      {children}
    </button>
  );
}