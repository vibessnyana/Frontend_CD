import ButtonAction from "../../ui/Button/ButtonAction.jsx";

export default function TopSearch({ onSearch }) {
  return (
    <div className="flex mb-4">
      <input
        type="text"
        placeholder="Search for Metadata Property"
        className="flex-1 p-2 border rounded-l"
      />

      <ButtonAction
        onClick={onSearch}
        className="bg-red-500 hover:bg-red-600 rounded-l-none px-4"
      >
        🔍
      </ButtonAction>
    </div>
  );
}