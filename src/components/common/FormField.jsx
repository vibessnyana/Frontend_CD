const FormField = ({ label, children }) => {
  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm text-gray-600">
        {label}
      </label>
      {children}
    </div>
  );
};

export default FormField;