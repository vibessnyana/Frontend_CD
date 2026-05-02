import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo1.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isPlagiarism = location.pathname === "/";
  const isMetadata = location.pathname === "/metadata";

  return (
    <div className="w-full bg-red-600 h-[60px] flex items-center px-10 text-white">

      <div className="flex-1 flex items-center">
        <img src={logo} className="h-10 object-contain" />
      </div>

      <div className="flex-1 flex justify-center gap-12 text-sm font-medium">
        <p
          onClick={() => navigate("/")}
          className={isPlagiarism ? "underline" : ""}
        >
          Cek plagiarisme
        </p>

        <p
          onClick={() => navigate("/metadata")}
          className={isMetadata ? "underline" : ""}
        >
          Search metadata
        </p>
      </div>

      <div className="flex-1 flex justify-end">
        <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
          <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
          <span className="text-sm">Bandung Techno Park</span>
        </div>
      </div>

    </div>
  );
}