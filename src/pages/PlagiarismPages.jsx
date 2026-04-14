import { useState } from "react";

/* ================= BUTTON ================= */
const Button = ({ children, onClick, variant = "primary" }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition";

  const styles = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-200 hover:bg-gray-300",
  };

  return (
    <button onClick={onClick} className={`${base} ${styles[variant]}`}>
      {children}
    </button>
  );
};

/* ================= SPINNER ================= */
const Spinner = () => (
  <div className="flex justify-center items-center h-[300px]">
    <div className="animate-spin text-4xl">🔄</div>
  </div>
);

/* ================= MODAL ================= */
const Modal = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px] text-center">
        {children}
      </div>
    </div>
  );
};

/* ================= UPLOAD ================= */
const PlagiarismUpload = ({ onUpload }) => {
  return (
    <div className="bg-white p-10 rounded-xl shadow-md text-center w-[500px]">
      <div className="text-5xl mb-4">📤</div>

      <p className="text-gray-500 mb-6">
        Upload file untuk cek plagiarisme
      </p>

      <Button onClick={onUpload}>Upload & Check</Button>
    </div>
  );
};

/* ================= RESULT MODAL ================= */
const ResultModal = ({
  percentage,
  onCancel,
  onVerify,
  onSave,
}) => {
  const isLow = percentage <= 30;
  const isMedium = percentage > 30 && percentage <= 70;

  return (
    <Modal>
      <h1 className="text-4xl font-bold mb-2">{percentage}%</h1>

      <p className="text-gray-500 mb-6">
        Terdeteksi Plagiarisme
      </p>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        {isLow && <Button onClick={onSave}>Save</Button>}

        {isMedium && (
          <Button onClick={onVerify}>Verifikasi</Button>
        )}
      </div>
    </Modal>
  );
};

/* ================= VERIFICATION ================= */
const PlagiarismVerification = ({ onNext, onCancel }) => {
  return (
    <div className="bg-white p-10 rounded-xl shadow-md text-center w-[400px]">
      <img
        src="https://via.placeholder.com/150"
        alt="preview"
        className="mx-auto mb-4 rounded"
      />

      <p className="text-gray-500 mb-6">
        Hasil verifikasi konten
      </p>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button onClick={onNext}>Next</Button>
      </div>
    </div>
  );
};

/* ================= FORM ================= */
const PlagiarismForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="bg-white p-10 rounded-xl shadow-md w-[400px]">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Input Data
      </h2>

      <input
        className="w-full mb-3 px-3 py-2 border rounded-lg"
        placeholder="Judul"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="w-full mb-4 px-3 py-2 border rounded-lg"
        placeholder="Deskripsi"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <div className="flex justify-end gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button onClick={onSubmit}>Save</Button>
      </div>
    </div>
  );
};

/* ================= SUCCESS MODAL ================= */
const SuccessModal = ({ onClose }) => {
  return (
    <Modal>
      <h2 className="text-lg font-semibold mb-3">
        ✅ Success
      </h2>

      <p className="mb-4 text-gray-500">
        Data berhasil disimpan
      </p>

      <Button onClick={onClose}>OK</Button>
    </Modal>
  );
};

/* ================= MAIN PAGE ================= */

const PlagiarismPages = () => {
  const [status, setStatus] = useState("idle");
  const [percentage, setPercentage] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* HEADER */}
      <div className="bg-red-600 text-white text-center py-6">
        <h1 className="text-3xl font-bold">
          Copyright System
        </h1>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex justify-center items-center">

        {status === "idle" && (
          <PlagiarismUpload
            onUpload={() => {
              setStatus("loading");

              setTimeout(() => {
                setPercentage(65);
                setStatus("result");
              }, 1500);
            }}
          />
        )}

        {status === "loading" && <Spinner />}

        {status === "verification" && (
          <PlagiarismVerification
            onNext={() => setStatus("form")}
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

      {/* 🔥 RESULT MODAL */}
      {status === "result" && (
        <ResultModal
          percentage={percentage}
          onCancel={() => setStatus("idle")}
          onVerify={() => setStatus("verification")}
          onSave={() => setStatus("form")}
        />
      )}

      {/* SUCCESS */}
      {status === "success" && (
        <SuccessModal onClose={() => setStatus("idle")} />
      )}
    </div>
  );
};

export default PlagiarismPages;