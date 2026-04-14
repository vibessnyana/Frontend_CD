const ErrorState = ({ message = "Terjadi kesalahan" }) => {
  return (
    <div className="text-center py-10 text-red-500">
      {message}
    </div>
  );
};

export default ErrorState;