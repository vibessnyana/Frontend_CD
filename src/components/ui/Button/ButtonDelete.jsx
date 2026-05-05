export default function ButtonDelete({
  onClick,
  type = "button",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="
        p-2
        bg-red-500
        rounded-md
        hover:bg-red-600
        transition
      "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-white"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M9 3a1 1 0 00-1 1v1H5a1 1 0 000 2h1v11a2 2 0 002 2h8a2 2 0 002-2V7h1a1 1 0 100-2h-3V4a1 1 0 00-1-1H9zm2 4a1 1 0 112 0v9a1 1 0 11-2 0V7zm-3 0a1 1 0 112 0v9a1 1 0 11-2 0V7zm6 0a1 1 0 112 0v9a1 1 0 11-2 0V7z" />
      </svg>
    </button>
  );
}