import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo1.png";
import Button from "../components/ui/Button.jsx";

import PlagiarismUpload from "../components/features/plagiarism/PlagiarismUpload.jsx";
import PlagiarismVerification from "../components/features/plagiarism/PlagiarismVerification.jsx";
import PlagiarismForm from "../components/features/plagiarism/PlagiarismForm.jsx";
import PlagiarismResult from "../components/features/plagiarism/PlagiarismResult.jsx";
import PlagiarismSettingModal from "../components/features/plagiarism/PlagiarismSettingModal.jsx";
import LoadingModal from "../components/features/plagiarism/LoadingModal.jsx";
import SuccessModal from "../components/features/plagiarism/SuccessModal.jsx";

export default function PlagiarismPages() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [threshold, setThreshold] = useState(65);
  const [resultPercent, setResultPercent] = useState(65);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">

      {/* NAVBAR */}
      <div className="w-full bg-red-600 h-[60px] flex items-center px-10 text-white">
        <div className="flex-1 flex items-center">
          <img src={logo} className="h-10" />
        </div>

        <div className="flex-1 flex justify-center gap-12 text-sm">
          <p onClick={() => navigate("/")}>Cek plagiarisme</p>
          <p onClick={() => navigate("/metadata")}>Search metadata</p>
        </div>

        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-lg">
            <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
            Bandung Techno Park
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">

        {status === "idle" && (
          <>
            <PlagiarismUpload
              preview={preview}
              setFile={setFile}
              setPreview={setPreview}
            />

            <Button onClick={() => {
              if (!file) return alert("Upload gambar dulu!");
              setStatus("setting");
            }}>
              Upload Gambar
            </Button>
          </>
        )}

        {status === "detail" && (
          <PlagiarismVerification
            preview={preview}
            resultPercent={resultPercent}
            threshold={threshold}
            onVerify={() => setStatus("form")}
            onCancel={() => setStatus("idle")}
          />
        )}

        {status === "form" && (
          <PlagiarismForm
            onSubmit={() => setStatus("success")}
            onCancel={() => setStatus("idle")}
          />
        )}

      </div>

      {/* MODALS */}

      {status === "setting" && (
        <PlagiarismSettingModal
          preview={preview}
          threshold={threshold}
          setThreshold={setThreshold}
          onCancel={() => setStatus("idle")}
          onCheck={() => {
            setStatus("loading");
            setTimeout(() => {
              setResultPercent(65); // default hasil deteksi
              setStatus("result");
            }, 1000);
          }}
        />
      )}

      {status === "loading" && <LoadingModal />}

      {status === "result" && (
        <PlagiarismResult
          resultPercent={resultPercent}
          onCancel={() => setStatus("idle")}
          onDetail={() => setStatus("detail")}
        />
      )}

      {status === "success" && (
        <SuccessModal onClose={() => setStatus("idle")} />
      )}

    </div>
  );
}