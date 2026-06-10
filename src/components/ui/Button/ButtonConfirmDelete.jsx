export default function ButtonConfirmDelete({
  children = "Yes",
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
          ? `
            px-5 py-2.5
            bg-gray-200 text-gray-400
            rounded-lg
            font-medium text-sm
            cursor-not-allowed opacity-70
            border border-gray-200
            transition
          `
          : `
            px-5 py-2.5
            bg-green-500 text-white
            rounded-lg
            font-medium text-sm
            hover:bg-green-600
            active:scale-95
            transition
          `
      }
    >
      {children}
    </button>
  );
}