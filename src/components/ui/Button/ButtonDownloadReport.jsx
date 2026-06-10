export default function ButtonDownloadReport({
  children = "Download Report",
  onClick,
  type = "button",
  disabled = false,
}) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      aria-disabled={disabled}
      className={
        disabled
          ? "pointer-events-none cursor-not-allowed rounded-md border border-gray-200 bg-gray-200/60 px-5 py-2 text-sm font-medium text-gray-400 opacity-70 shadow-none"
          : "rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 active:scale-95"
      }
    >
      {children}
    </button>
  );
}