export default function ButtonSave({
  children = "Save",
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        px-5 py-2 rounded-md text-sm font-medium
        bg-green-600 text-white
        hover:bg-green-700
        transition-all duration-200
      "
    >
      {children}
    </button>
  );
}