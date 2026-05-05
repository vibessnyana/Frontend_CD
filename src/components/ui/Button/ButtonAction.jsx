export default function ButtonAction({
  children,
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
        bg-green-500 text-white
        hover:bg-green-600
        active:scale-95
        shadow-sm
        transition-all duration-200
        ${className}
      `}
    >
      {children}
    </button>
  );
}