import SimilarityItem from "./SimilarityItem.jsx";

export default function SimilarityList({ title, data }) {
  return (
    <>
      <h3 className="font-semibold mb-2">{title}</h3>

      {data.map((item, i) => (
        <SimilarityItem key={i} {...item} />
      ))}
    </>
  );
}