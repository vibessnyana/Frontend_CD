import { useState, useEffect } from "react";

import ButtonAction from "../components/ui/Button/ButtonAction.jsx";

import PlagiarismUpload from "../components/features/plagiarism/PlagiarismUpload.jsx";
import PlagiarismVerification from "../components/features/plagiarism/PlagiarismVerification.jsx";
import PlagiarismForm from "../components/features/plagiarism/PlagiarismForm.jsx";
import PlagiarismResult from "../components/features/plagiarism/PlagiarismResult.jsx";
import PlagiarismSettingModal from "../components/features/plagiarism/PlagiarismSettingModal.jsx";
import LoadingModal from "../components/features/plagiarism/LoadingModal.jsx";
import SuccessModal from "../components/features/plagiarism/SuccessModal.jsx";
import ErrorModal from "../components/features/plagiarism/ErrorModal.jsx";

import {
  approveReviewCheck,
  checkPlagiarism,
  registerMetadata,
  rejectReviewCheck,
} from "../services/PlagiarismService.jsx";

import { saveReportToLocalStorage } from "../services/ReportStorageService.jsx";

function normalizePercent(value) {
  return Number((Number(value || 0) * 100).toFixed(2));
}

function toDecimalThresholds(value) {
  return {
    high: Number(value.high) / 100,
    medium: Number(value.medium) / 100,
    low: Number(value.low) / 100,
  };
}

function getRegisteredMetadataId(response) {
  return String(
    response?._id ??
      response?.id ??
      response?.metadata_id ??
      response?.metadataId ??
      response?.data?._id ??
      response?.data?.id ??
      response?.data?.metadata_id ??
      response?.data?.metadataId ??
      response?.metadata?._id ??
      response?.metadata?.id ??
      response?.metadata?.metadata_id ??
      response?.metadata?.metadataId ??
      ""
  );
}

function getRegisteredImageUrl(response) {
  return (
    response?.image_url ||
    response?.imageUrl ||
    response?.data?.image_url ||
    response?.data?.imageUrl ||
    response?.metadata?.image_url ||
    response?.metadata?.imageUrl ||
    ""
  );
}

export default function PlagiarismPages() {
  const [status, setStatus] = useState("idle");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [threshold, setThreshold] = useState(0);
  const [resultPercent, setResultPercent] = useState(0);
  const [plagiarismResult, setPlagiarismResult] = useState(null);
  const [registrationResult, setRegistrationResult] = useState(null);
  const [isSavingMetadata, setIsSavingMetadata] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
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

  const handleSave = async (metadataPayload) => {
    if (isSavingMetadata) return;

    try {
      setIsSavingMetadata(true);
      setErrorMessage("");

      const { report, ...backendPayload } = metadataPayload;

      const response = await registerMetadata(backendPayload);
      const metadataId = getRegisteredMetadataId(response);
      const registeredImageUrl = getRegisteredImageUrl(response);

      if (report) {
        saveReportToLocalStorage({
          metadataId,
          checkId: metadataPayload.check_id,
          title: metadataPayload.title,
          imageUrl:
            registeredImageUrl ||
            report.uploaded_image_url ||
            report.image_url ||
            preview ||
            "",
          report,
        });
      }

      setRegistrationResult(response);
      setStatus("success");
    } catch (err) {
      setErrorMessage(err.message || "Gagal menyimpan metadata");
      setStatus("error");
    } finally {
      setIsSavingMetadata(false);
    }
  };

  const handleResetFlow = () => {
    setStatus("idle");
    setFile(null);
    setPreview(null);
    setThreshold(0);
    setResultPercent(0);
    setPlagiarismResult(null);
    setRegistrationResult(null);
    setIsSavingMetadata(false);
    setErrorMessage("");
  };

  const handleApproveReview = async () => {
    try {
      if (!plagiarismResult?.check_id) return;

      setErrorMessage("");

      const response = await approveReviewCheck(plagiarismResult.check_id);

      setPlagiarismResult((current) => ({
        ...current,
        can_register: true,
        registration_status: "allowed",
        registration_reason:
          response.message ||
          "Hasil review disetujui. Metadata dapat didaftarkan.",
        manual_review_status: response.manual_review_status,
        manual_review_reason: response.manual_review_reason,
      }));
    } catch (err) {
      setErrorMessage(err.message || "Gagal menyetujui hasil review");
      setStatus("error");
    }
  };

  const handleRejectReview = async () => {
    try {
      if (!plagiarismResult?.check_id) return;

      setErrorMessage("");

      const response = await rejectReviewCheck(plagiarismResult.check_id);

      setPlagiarismResult((current) => ({
        ...current,
        can_register: false,
        registration_status: "blocked",
        registration_reason:
          response.message ||
          "Hasil review ditolak. Metadata tidak dapat didaftarkan.",
        manual_review_status: response.manual_review_status,
        manual_review_reason: response.manual_review_reason,
      }));
    } catch (err) {
      setErrorMessage(err.message || "Gagal menolak hasil review");
      setStatus("error");
    }
  };

  const handleCheck = async (data) => {
    try {
      const selectedThreshold = data.value?.high || 0;

      setThreshold(Number(selectedThreshold));
      setErrorMessage("");
      setStatus("loading");

      const response = await checkPlagiarism({
        file,
        preset: data.type === "preset" ? data.preset : null,
        thresholds:
          data.type === "manual" ? toDecimalThresholds(data.value) : null,
      });

      const score = response?.similarity_result?.overall_score || 0;

      setPlagiarismResult(response);
      setResultPercent(normalizePercent(score));
      setStatus("result");
    } catch (err) {
      setErrorMessage(err.message || "Gagal mengecek plagiarisme");
      setErrorMessage(err.message || "Gagal mengecek plagiarisme");
      setStatus("error");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full flex-col bg-gray-100">
      <div
        className={`
          flex-1 flex flex-col items-center px-5 py-6 sm:px-6
          transition duration-200
          ${isModalOpen ? "blur-sm scale-[0.99]" : ""}
        `}
      >
        {(status === "idle" || isModalOpen) && (
          <div className="w-full max-w-[860px]">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mt-1 text-sm text-gray-500">
                  Upload gambar karya untuk memeriksa kemiripan internal dan
                  eksternal.
                </p>
              </div>
            </div>

            <PlagiarismUpload
              preview={preview}
              setFile={setFile}
              setPreview={setPreview}
            />

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-full truncate text-sm text-gray-500">
                File:{" "}
                <span className="font-medium text-gray-700">
                  {fileName}
                </span>
              </p>

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
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/35 z-40 animate-modal-backdrop"></div>
      )}

      {status === "detail" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 animate-modal-panel">
          <PlagiarismVerification
            preview={preview}
            resultPercent={resultPercent}
            threshold={threshold}
            result={plagiarismResult}
            onVerify={() =>
              plagiarismResult?.can_register && setStatus("form")
            }
            onCancel={() => setStatus("idle")}
            onApproveReview={handleApproveReview}
            onRejectReview={handleRejectReview}
          />
        </div>
      )}

      {status === "form" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 animate-modal-panel">
          <PlagiarismForm
            checkId={plagiarismResult?.check_id}
            report={plagiarismResult}
            resultPercent={resultPercent}
            preview={preview}
            onSubmit={handleSave}
            onCancel={() => setStatus("idle")}
            isSubmitting={isSavingMetadata}
          />
        </div>
      )}

      {status === "setting" && (
        <PlagiarismSettingModal
          preview={preview}
          onCancel={() => setStatus("idle")}
          onCheck={handleCheck}
          onCheck={handleCheck}
        />
      )}

      {status === "loading" && <LoadingModal />}

      {status === "result" && (
        <PlagiarismResult
          resultPercent={resultPercent}
          result={plagiarismResult}
          onCancel={() => setStatus("idle")}
          onDetail={() => setStatus("detail")}
        />
      )}

      {status === "success" && (
        <SuccessModal onClose={handleResetFlow} result={registrationResult} />
      )}

      {status === "error" && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setStatus(plagiarismResult ? "form" : "idle")}
        />
      )}
    </div>
  );
}


