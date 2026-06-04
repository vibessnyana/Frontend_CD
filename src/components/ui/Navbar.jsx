import { NavLink } from "react-router-dom";
import logo from "../../assets/logo1.webp";

export default function Navbar() {
  const navClass = ({ isActive }) =>
    `flex-1 rounded-lg px-3 py-2 text-center transition sm:flex-none sm:px-4 ${
      isActive
        ? "bg-red-800 text-white shadow-sm"
        : "text-white hover:bg-red-700 hover:text-white"
    }`;

  return (
    <div className="relative flex min-h-[60px] w-full flex-wrap items-center gap-3 bg-red-600 px-4 py-2 text-white shadow-sm sm:px-6 lg:flex-nowrap lg:px-10">

      <div className="flex min-w-fit flex-1 items-center">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" width="120" height="43" className="h-9 object-contain sm:h-10" />
          <div className="hidden lg:block h-8 w-px bg-white/25"></div>
        </div>
      </div>

      <div className="order-3 flex w-full rounded-xl bg-red-800/40 p-1 text-sm font-medium sm:order-none sm:w-auto sm:flex-1 sm:justify-end sm:gap-2 sm:bg-transparent sm:p-0">
        <NavLink to="/" className={navClass}>
          Cek plagiarisme
        </NavLink>

        <NavLink to="/metadata" className={navClass}>
          Search metadata
        </NavLink>
      </div>

      <div className="flex min-w-fit flex-1 justify-end">
        <div className="flex items-center gap-2 rounded-lg border border-white/30 bg-red-800 px-3 py-1.5 shadow-sm">
          <div className="h-7 w-7 rounded-full bg-white/80"></div>
          <span className="hidden text-sm font-medium sm:inline">Bandung Techno Park</span>
        </div>
      </div>

    </div>
  );
}

