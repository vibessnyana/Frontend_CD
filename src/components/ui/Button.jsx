export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
  disabled = false,
}) {
  const base =
    "px-4 py-2 rounded-md text-sm font-medium transition";

  const styles = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-300 text-black hover:bg-gray-400",
    success: "bg-green-600 text-white hover:bg-green-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${styles[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}