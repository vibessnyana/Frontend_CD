const Card = ({ children }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4">
      {children}
    </div>
  );
};

export default Card;