export default function ButtonCancel({
  children = "Cancel",
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-5 py-2 rounded-md text-sm font-medium
        bg-gray-300 text-black
        hover:bg-red-500 hover:text-white
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
}