export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex justify-center mt-6 items-center gap-2 text-sm">

      {/* PREV */}
      <button
        onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded border ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {"<"}
      </button>

      {/* PAGE NUMBERS */}
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageChange(i + 1)}
          className={`px-3 py-1 rounded ${
            currentPage === i + 1
              ? "bg-red-600 text-white"
              : "bg-white border hover:bg-gray-100"
          }`}
        >
          {i + 1}
        </button>
      ))}

      {/* NEXT */}
      <button
        onClick={() =>
          onPageChange((p) => Math.min(p + 1, totalPages))
        }
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded border ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-gray-100"
        }`}
      >
        {">"}
      </button>

    </div>
  );
}