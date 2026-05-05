export default function ButtonReset({
  children = "Reset",
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        px-3 py-1.5 rounded-md text-sm font-medium
        bg-red-500 text-white
        hover:bg-red-600
        active:scale-95
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
}