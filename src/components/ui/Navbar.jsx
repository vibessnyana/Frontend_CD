import { NavLink } from "react-router-dom";
import logo from "../../assets/logo1.png";

export default function Navbar() {
  const navClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg cursor-pointer transition ${
      isActive
        ? "bg-white/15 text-white/90 shadow-sm"
        : "text-white/90 hover:bg-white/15 hover:text-white"
    }`;

  return (
    <div className="w-full relative bg-red-600 h-[60px] flex items-center px-10 text-white shadow-sm">

      <div className="flex-1 flex items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-10 object-contain" />
          <div className="hidden lg:block h-8 w-px bg-white/25"></div>
        </div>
      </div>

      <div className="flex-1 flex  justify-end gap-2 text-sm font-medium">
        <NavLink to="/" className={navClass}>
          Cek plagiarisme
        </NavLink>

        <NavLink to="/metadata" className={navClass}>
          Search metadata
        </NavLink>
      </div>

      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-2 bg-white/15 border border-white/20 px-3 py-1.5 rounded-lg shadow-sm">
          <div className="w-7 h-7 bg-white/80 rounded-full"></div>
          <span className="text-sm font-medium">Bandung Techno Park</span>
        </div>
      </div>

    </div>
  );
}
