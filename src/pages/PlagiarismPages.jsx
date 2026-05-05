import { useState, useEffect } from "react";

// ✅ GANTI BUTTON
import ButtonAction from "../components/ui/button/ButtonAction.jsx";

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

  // 🔥 tetap pakai medium threshold (tidak diubah)
  const [threshold, setThreshold] = useState(65);

  const [resultPercent, setResultPercent] = useState(65);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

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

            {/* ✅ GANTI KE BUTTON ACTION */}
            <ButtonAction
              onClick={() => {
                if (!file) return alert("Upload gambar dulu!");
                setStatus("setting");
              }}
              className="!bg-red-500 hover:!bg-red-600"
            >
              Cek Plagiarisme
            </ButtonAction>
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

      {/* ================= MODAL SETTING ================= */}
      {status === "setting" && (
        <PlagiarismSettingModal
          preview={preview}
          onCancel={() => setStatus("idle")}
          onCheck={(data) => {
            let mediumValue = 0;

            if (data.type === "preset") {
              mediumValue = data.value.medium;
            } else {
              mediumValue = parseFloat(data.value.medium || 0);
            }

            console.log("MEDIUM THRESHOLD:", mediumValue);

            setThreshold(mediumValue);

            setStatus("loading");

            setTimeout(() => {
              setResultPercent(65);
              setStatus("result");
            }, 1000);
          }}
        />
      )}

      {/* ================= MODALS ================= */}
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