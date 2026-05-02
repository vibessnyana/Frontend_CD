import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/ui/Navbar.jsx";
import PlagiarismPages from "./pages/PlagiarismPages.jsx";
import MetadataPages from "./pages/MetadataPages.jsx";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PlagiarismPages />} />
        <Route path="/metadata" element={<MetadataPages />} />
      </Routes>
    </>
  );
}