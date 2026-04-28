export default function TopSearch({ onSearch }) {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Search for Metadata Property"
        className="flex-1 p-2 border rounded-l"
      />

      <button
        onClick={onSearch}
        className="bg-red-500 text-white px-4 rounded-r"
      >
        🔍
      </button>
    </div>
  );
}