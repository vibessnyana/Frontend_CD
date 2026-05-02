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

import usePlagiarism from "../hooks/usePlagiarism";
import { STATUS } from "../constants/plagiarismStatus";

export default function PlagiarismPages() {
  const navigate = useNavigate();

  const {
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
  } = usePlagiarism();

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">


      {/* CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">

        {status === STATUS.IDLE && (
          <>
            <PlagiarismUpload
              preview={preview}
              setFile={setFile}
              setPreview={setPreview}
            />

            <Button
              onClick={() => {
                if (!file) return alert("Upload gambar dulu!");
                setStatus(STATUS.SETTING);
              }}
            >
              Upload Gambar
            </Button>
          </>
        )}

        {status === STATUS.DETAIL && (
          <PlagiarismVerification
            preview={preview}
            resultPercent={resultPercent}
            threshold={threshold}
            onVerify={() => setStatus(STATUS.FORM)}
            onCancel={() => setStatus(STATUS.IDLE)}
          />
        )}

        {status === STATUS.FORM && (
          <PlagiarismForm
            onSubmit={() => setStatus(STATUS.SUCCESS)}
            onCancel={() => setStatus(STATUS.IDLE)}
          />
        )}
      </div>

      {/* MODALS */}
      {status === STATUS.SETTING && (
        <PlagiarismSettingModal
          preview={preview}
          threshold={threshold}
          setThreshold={setThreshold}
          onCancel={() => setStatus(STATUS.IDLE)}
          onCheck={startCheck}
        />
      )}

      {status === STATUS.LOADING && <LoadingModal />}

      {status === STATUS.RESULT && (
        <PlagiarismResult
          resultPercent={resultPercent}
          onCancel={() => setStatus(STATUS.IDLE)}
          onDetail={() => setStatus(STATUS.DETAIL)}
        />
      )}

      {status === STATUS.SUCCESS && (
        <SuccessModal onClose={() => setStatus(STATUS.IDLE)} />
      )}

    </div>
  );
}