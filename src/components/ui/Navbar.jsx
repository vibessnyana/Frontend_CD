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
    <div className="relative flex min-h-[60px] w-full flex-wrap items-center gap-3 bg-red-600 px-4 py-2 text-white shadow-sm sm:px-6 lg:flex-nowrap lg:px-10">

      <div className="flex min-w-fit flex-1 items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="h-9 object-contain sm:h-10" />
          <div className="hidden lg:block h-8 w-px bg-white/25"></div>
        </div>
      </div>

      <div className="order-3 flex w-full justify-center gap-2 text-sm font-medium sm:order-none sm:w-auto sm:flex-1 sm:justify-end">
        <NavLink to="/" className={navClass}>
          Cek plagiarisme
        </NavLink>

        <NavLink to="/metadata" className={navClass}>
          Search metadata
        </NavLink>
      </div>

      <div className="flex min-w-fit flex-1 justify-end">
        <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/15 px-3 py-1.5 shadow-sm">
          <div className="h-7 w-7 rounded-full bg-white/80"></div>
          <span className="hidden text-sm font-medium sm:inline">Bandung Techno Park</span>
        </div>
      </div>

    </div>
  );
}
