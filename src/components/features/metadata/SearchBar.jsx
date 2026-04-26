import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  return (
    <div className="w-full flex">
      <input
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onSearch(e.target.value);
        }}
        placeholder="Search for Metadata Property"
        className="flex-1 p-3 rounded-l-lg border border-gray-300 outline-none"
      />

      <button className="bg-red-600 px-4 rounded-r-lg text-white">
        🔍
      </button>
    </div>
  );
}