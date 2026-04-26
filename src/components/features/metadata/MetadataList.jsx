import MetadataCard from "./MetadataCard";

export default function MetadataList({ data, onSelect }) {
  return (
    <div className="grid grid-cols-3 gap-5 mt-5">
      {data.map((item) => (
        <MetadataCard
          key={item._id}
          data={item}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}