const EmptyState = ({ message = "Data tidak ditemukan" }) => {
  return (
    <div className="text-center py-10 text-gray-500">
      {message}
    </div>
  );
};

export default EmptyState;