export default function Button({
  children,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}) {
  const base =
    "px-5 py-2 rounded-md text-sm font-medium transition-all duration-200 focus:outline-none";

  let style = "";

  switch (variant) {
    case "primary":
      style = "bg-blue-500 text-white hover:bg-blue-600";
      break;

    case "success":
      style = "bg-green-600 text-white hover:bg-green-700";
      break;

    case "danger":
      style = "bg-red-500 text-white hover:bg-red-600";
      break;

    case "secondary":
      style = "bg-gray-300 text-black hover:bg-red-500 hover:text-white";
      break;

    default:
      style = "bg-gray-200 text-black";
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${style} ${className}`}
    >
      {children}
    </button>
  );
}