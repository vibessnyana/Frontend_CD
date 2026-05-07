import { useState, useEffect } from "react";
import ButtonAction from "../components/ui/button/ButtonAction.jsx";

import PlagiarismUpload from "../components/features/plagiarism/PlagiarismUpload.jsx";
import PlagiarismVerification from "../components/features/plagiarism/PlagiarismVerification.jsx";
import PlagiarismForm from "../components/features/plagiarism/PlagiarismForm.jsx";
import PlagiarismResult from "../components/features/plagiarism/PlagiarismResult.jsx";
import PlagiarismSettingModal from "../components/features/plagiarism/PlagiarismSettingModal.jsx";
import LoadingModal from "../components/features/plagiarism/LoadingModal.jsx";
import SuccessModal from "../components/features/plagiarism/SuccessModal.jsx";
import ErrorModal from "../components/features/plagiarism/ErrorModal.jsx";
import { checkPlagiarism } from "../services/PlagiarismService.jsx";

export default function PlagiarismPages() {
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [threshold, setThreshold] = useState(65);
  const [resultPercent, setResultPercent] = useState(65);
  const [plagiarismResult, setPlagiarismResult] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const modalStatuses = [
    "setting",
    "loading",
    "result",
    "detail",
    "form",
    "success",
    "error",
  ];
  const isModalOpen = modalStatuses.includes(status);
  const fileName = file?.name || "Belum ada file dipilih";

  const handleSave = () => {
    try {
      const isError = false;

      if (isError) {
        throw new Error("Gagal menyimpan data!");
      }

      setStatus("success");
    } catch (err) {
      setErrorMessage(err.message || "Terjadi kesalahan!");
      setStatus("error");
    }
  };

  const normalizePercent = (value) => Number((Number(value || 0) * 100).toFixed(2));

  const toDecimalThresholds = (value) => ({
    high: Number(value.high) / 100,
    medium: Number(value.medium) / 100,
    low: Number(value.low) / 100,
  });

  const handleCheck = async (data) => {
    try {
      const selectedThreshold = data.value?.medium || 0;
      setThreshold(Number(selectedThreshold));
      setErrorMessage("");
      setStatus("loading");

      const response = await checkPlagiarism({
        file,
        preset: data.type === "preset" ? data.preset : null,
        thresholds: data.type === "manual" ? toDecimalThresholds(data.value) : null,
      });

      const score = response?.similarity_result?.overall_score || 0;
      setPlagiarismResult(response);
      setResultPercent(normalizePercent(score));
      setStatus("result");
    } catch (err) {
      setErrorMessage(err.message || "Gagal mengecek plagiarisme");
      setStatus("error");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-60px)] overflow-hidden bg-gray-100 flex flex-col">
      {/* CONTENT */}
      <div
        className={`
          flex-1 flex flex-col items-center px-6 py-6
          transition duration-200
          ${isModalOpen ? "blur-sm scale-[0.99]" : ""}
        `}
      >
        {(status === "idle" || isModalOpen) && (
          <div className="w-full max-w-[860px]">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mt-1 text-sm text-gray-500">
                  Upload gambar karya untuk memeriksa kemiripan internal dan eksternal.
                </p>
              </div>

              <div className="rounded-lg bg-white px-4 py-2 text-right shadow-sm border border-gray-100">
                <p className="text-xs text-gray-400">Medium threshold</p>
                <p className="text-sm font-semibold text-gray-700">{threshold}%</p>
              </div>
            </div>

            <PlagiarismUpload
              preview={preview}
              setFile={setFile}
              setPreview={setPreview}
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-full truncate text-sm text-gray-500">
                File: <span className="font-medium text-gray-700">{fileName}</span>
              </p>

              <ButtonAction
                onClick={() => {
                  if (!file) return alert("Upload gambar dulu!");
                  setStatus("setting");
                }}
                className="!bg-red-500 hover:!bg-red-600 sm:min-w-[170px]"
              >
                Cek Plagiarisme
              </ButtonAction>
            </div>
          </div>
        )}
      </div>

      {/* OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/35 z-40"></div>
      )}

      {/* DETAIL */}
      {status === "detail" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6">
          <PlagiarismVerification
            preview={preview}
            resultPercent={resultPercent}
            threshold={threshold}
            result={plagiarismResult}
            onVerify={() => setStatus("form")}
            onCancel={() => setStatus("idle")}
          />
        </div>
      )}

      {/* FORM */}
      {status === "form" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6">
          <PlagiarismForm
            onSubmit={handleSave}
            onCancel={() => setStatus("idle")}
          />
        </div>
      )}

      {/* SETTING */}
      {status === "setting" && (
        <PlagiarismSettingModal
          preview={preview}
          onCancel={() => setStatus("idle")}
          onCheck={handleCheck}
        />
      )}

      {/* LOADING */}
      {status === "loading" && <LoadingModal />}

      {/* RESULT */}
      {status === "result" && (
        <PlagiarismResult
          resultPercent={resultPercent}
          result={plagiarismResult}
          onCancel={() => setStatus("idle")}
          onDetail={() => setStatus("detail")}
        />
      )}

      {/* SUCCESS */}
      {status === "success" && (
        <SuccessModal onClose={() => setStatus("idle")} />
      )}

      {/* ERROR */}
      {status === "error" && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setStatus(plagiarismResult ? "form" : "idle")}
        />
      )}
    </div>
  );
}
