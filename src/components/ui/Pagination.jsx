export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const visiblePages = new Set([1, totalPages]);
    const edgePageCount = 4;
    const siblingCount = 1;

    if (totalPages <= edgePageCount + 2) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= edgePageCount) {
      for (let page = 2; page <= edgePageCount; page += 1) {
        visiblePages.add(page);
      }
    } else if (currentPage >= totalPages - edgePageCount + 1) {
      for (
        let page = totalPages - edgePageCount + 1;
        page < totalPages;
        page += 1
      ) {
        visiblePages.add(page);
      }
    } else {
      for (
        let page = currentPage - siblingCount;
        page <= currentPage + siblingCount;
        page += 1
      ) {
        visiblePages.add(page);
      }
    }


    const pages = [...visiblePages].sort((a, b) => a - b);

    return pages.reduce((items, page, index) => {
      const previousPage = pages[index - 1];

      if (previousPage && page - previousPage > 1) {
        items.push(`ellipsis-${previousPage}-${page}`);
      }

      items.push(page);
      return items;
    }, []);
  };

  const visiblePages = getVisiblePages();
  const buttonClass =
    "flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition";

  return (
    <div
      className={`flex max-w-full justify-center mt-6 items-center gap-2.5 overflow-hidden text-sm ${className}`}
    >
      <button
        onClick={() => onPageChange((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className={`${buttonClass} ${
          currentPage === 1
            ? "border-gray-200 bg-white text-gray-300 cursor-not-allowed"
            : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
        }`}
      >
        {"<"}
      </button>

      {visiblePages.map((item) =>
        typeof item === "string" ? (
          <span
            key={item}
            className="flex h-9 min-w-9 items-center justify-center px-1 text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={`${buttonClass} ${
              currentPage === item
                ? "border-red-600 bg-red-600 text-white shadow-sm"
                : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className={`${buttonClass} ${
          currentPage === totalPages
            ? "border-gray-200 bg-white text-gray-300 cursor-not-allowed"
            : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
        }`}
      >
        {">"}
      </button>
    </div>
  );
}
