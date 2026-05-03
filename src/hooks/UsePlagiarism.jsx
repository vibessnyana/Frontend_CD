import { useState, useEffect } from "react";

export default function usePlagiarism() {
  // ======================
  // STATE (SAMA PERSIS)
  // ======================
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [threshold, setThreshold] = useState(65);
  const [resultPercent, setResultPercent] = useState(65);

  // ======================
  // CLEANUP
  // ======================
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ======================
  // ACTIONS (FLOW SAMA)
  // ======================

  const handleUploadClick = () => {
    if (!file) {
      alert("Upload gambar dulu!");
      return;
    }
    setStatus("setting");
  };

  const handleCheck = () => {
    setStatus("loading");

    setTimeout(() => {
      setResultPercent(65); // 🔥 tetap 65
      setStatus("result");
    }, 1000);
  };

  const handleToDetail = () => setStatus("detail");
  const handleToForm = () => setStatus("form");
  const handleToSuccess = () => setStatus("success");
  const handleReset = () => setStatus("idle");

  // ======================
  // RETURN
  // ======================
  return {
    status,
    file,
    preview,
    threshold,
    resultPercent,

    setFile,
    setPreview,
    setThreshold,

    handleUploadClick,
    handleCheck,
    handleToDetail,
    handleToForm,
    handleToSuccess,
    handleReset,
  };
}