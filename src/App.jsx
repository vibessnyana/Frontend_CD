import { Routes, Route } from "react-router-dom";
import PlagiarismPages from "./pages/PlagiarismPages";
import MetadataPages from "./pages/MetadataPages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PlagiarismPages />} />
      <Route path="/metadata" element={<MetadataPages />} />
    </Routes>
  );
}