import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      
      {/* Logo / Title */}
      <h1 className="text-lg font-semibold">
        Plagiarism Checker
      </h1>

      {/* Menu */}
      <div className="flex gap-4">
        <Link
          to="/"
          className="text-gray-600 hover:text-black"
        >
          Plagiarism
        </Link>

        <Link
          to="/metadata"
          className="text-gray-600 hover:text-black"
        >
          Metadata
        </Link>
      </div>
    </div>
  );
};

export default Navbar;