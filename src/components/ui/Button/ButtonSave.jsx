export default function ButtonSave({
  children = "Save",
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
          ? "cursor-not-allowed rounded-md border border-gray-200 bg-gray-200/70 px-5 py-2 text-sm font-medium text-gray-400 opacity-70 shadow-none"
          : "rounded-md bg-green-600 px-5 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-green-700"
      }
    >
      {children}
    </button>
  );
}
