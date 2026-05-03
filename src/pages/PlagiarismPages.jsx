import { useState, useEffect } from "react";
import Button from "../components/ui/Button.jsx";

import PlagiarismUpload from "../components/features/plagiarism/PlagiarismUpload.jsx";
import PlagiarismVerification from "../components/features/plagiarism/PlagiarismVerification.jsx";
import PlagiarismForm from "../components/features/plagiarism/PlagiarismForm.jsx";
import PlagiarismResult from "../components/features/plagiarism/PlagiarismResult.jsx";
import PlagiarismSettingModal from "../components/features/plagiarism/PlagiarismSettingModal.jsx";
import LoadingModal from "../components/features/plagiarism/LoadingModal.jsx";
import SuccessModal from "../components/features/plagiarism/SuccessModal.jsx";

export default function PlagiarismPages() {
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

  // modal yang bikin blur
  const isModalOpen =
    status === "setting" ||
    status === "loading" ||
    status === "result" ||
    status === "success";

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">

      {/* ================= CONTENT ================= */}
      <div
        className={`
          flex-1 flex flex-col items-center
          pt-4 gap-4
          ${isModalOpen ? "blur-sm" : ""}
        `}
      >

        {/* ================= IDLE ================= */}
        {status === "idle" && (
          <>
            <PlagiarismUpload
              preview={preview}
              setFile={setFile}
              setPreview={setPreview}
            />

            <Button
              onClick={() => {
                if (!file) return alert("Upload gambar dulu!");
                setStatus("setting");
              }}
            >
              Cek Plagiarisme
            </Button>
          </>
        )}

        {/* ================= DETAIL ================= */}
        {status === "detail" && (
          <PlagiarismVerification
            preview={preview}
            resultPercent={resultPercent}
            threshold={threshold}
            onVerify={() => setStatus("form")}
            onCancel={() => setStatus("idle")}
          />
        )}

        {/* ================= FORM ================= */}
        {status === "form" && (
          <PlagiarismForm
            onSubmit={() => setStatus("success")}
            onCancel={() => setStatus("idle")}
          />
        )}
      </div>

      {/* ================= OVERLAY ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 z-40"></div>
      )}

      {/* ================= MODALS ================= */}
      {status === "setting" && (
        <PlagiarismSettingModal
          preview={preview}
          threshold={threshold}
          setThreshold={setThreshold}
          onCancel={() => setStatus("idle")}
          onCheck={() => {
            setStatus("loading");
            setTimeout(() => {
              setResultPercent(65);
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