import Input from "../ui/Input";

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="w-full mb-4">
      <Input
        placeholder="Search..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;