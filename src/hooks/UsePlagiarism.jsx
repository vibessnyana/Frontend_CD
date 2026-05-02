import { useState, useEffect } from "react";
import { STATUS } from "../constants/plagiarismStatus";

export default function usePlagiarism() {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [threshold, setThreshold] = useState(65);
  const [resultPercent, setResultPercent] = useState(65);

  // cleanup preview
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // simulasi cek plagiarisme
  const startCheck = () => {
    setStatus(STATUS.LOADING);

    setTimeout(() => {
      setResultPercent(65);
      setStatus(STATUS.RESULT);
    }, 1000);
  };

  return {
    status,
    setStatus,
    file,
    setFile,
    preview,
    setPreview,
    threshold,
    setThreshold,
    resultPercent,
    startCheck,
  };
}