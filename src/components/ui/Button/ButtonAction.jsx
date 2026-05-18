export default function ButtonAction({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) {
  const baseClass = "px-5 py-2 rounded-md text-sm font-medium transition-all duration-200";
  const stateClass = disabled
    ? "pointer-events-none cursor-not-allowed border border-gray-200 !bg-gray-200/60 !text-gray-400 opacity-70 shadow-none"
    : `bg-green-500 text-white hover:bg-green-600 active:scale-95 shadow-sm ${className}`;

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={`${baseClass} ${stateClass}`}
    >
      {children}
    </button>
  );
}
