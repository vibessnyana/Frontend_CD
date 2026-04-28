import ItemCard from "./ItemCard";

export default function ItemGrid({ data, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {data.map((item) => (
        <ItemCard
          key={item._id}
          data={item}
          onClick={() => onSelect(item)}
        />
      ))}
    </div>
  );
}