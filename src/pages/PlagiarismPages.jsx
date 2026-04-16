import { useState } from "react";
import logo from "../assets/logo.png";

/* ================= BUTTON ================= */
const Button = ({ children, onClick, variant = "primary" }) => {
  const styles = {
    primary: "bg-red-600 text-white hover:bg-red-700",
    secondary: "bg-gray-300 text-black",
    success: "bg-green-600 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-5 py-2 rounded-md text-sm font-medium ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

/* ================= MODAL ================= */
const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[350px] text-center">
      {children}
    </div>
  </div>
);

/* ================= LOADING ================= */
const LoadingModal = () => (
  <Modal>
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">Processing...</p>
    </div>
  </Modal>
);

/* ================= RESULT ================= */
const ResultModal = ({ percentage, onCancel, onVerify, onSave }) => {
  const isLow = percentage <= 30;
  const isMedium = percentage <= 70;

  const color =
    percentage <= 30
      ? "text-green-500"
      : percentage <= 70
      ? "text-yellow-500"
      : "text-red-500";

  return (
    <Modal>
      <h1 className={`text-5xl font-bold mb-2 ${color}`}>
        {percentage}%
      </h1>

      <p className="text-gray-500 mb-5 text-sm">
        Terdeteksi Plagiarisme
      </p>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        {isLow && (
          <Button variant="success" onClick={onSave}>
            Save
          </Button>
        )}

        {!isLow && isMedium && (
          <Button variant="success" onClick={onVerify}>
            Verifikasi
          </Button>
        )}
      </div>
    </Modal>
  );
};

/* ================= SIMILARITY ITEM ================= */
const SimilarityItem = ({ img, percent }) => (
  <div className="flex items-center gap-3 mb-3">
    <img src={img} className="w-14 h-14 object-cover rounded-md" />
    <span className="text-sm font-medium">{percent}%</span>
  </div>
);

/* ================= VERIFICATION ================= */
const Verification = ({ onNext, onCancel }) => {
  const internal = [
    { img: "https://via.placeholder.com/100", percent: 92 },
    { img: "https://via.placeholder.com/100", percent: 87 },
    { img: "https://via.placeholder.com/100", percent: 80 },
  ];

  const external = [
    { img: "https://via.placeholder.com/100", percent: 78 },
    { img: "https://via.placeholder.com/100", percent: 70 },
    { img: "https://via.placeholder.com/100", percent: 65 },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow w-[900px] flex gap-6">

      <div className="flex-1">
        <img src="https://via.placeholder.com/400" className="rounded-lg" />
      </div>

      <div className="flex-1 border-l pl-6">
        <h3 className="font-semibold mb-2">Top 3 Internal</h3>
        {internal.map((item, i) => (
          <SimilarityItem key={i} {...item} />
        ))}

        <h3 className="font-semibold mt-4 mb-2">Top 3 External</h3>
        {external.map((item, i) => (
          <SimilarityItem key={i} {...item} />
        ))}

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={onNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

/* ================= FORM ================= */
const Form = ({ onSubmit, onCancel }) => (
  <div className="bg-white p-6 rounded-xl shadow w-[700px] flex gap-6">
    <img src="https://via.placeholder.com/300" />

    <div className="flex-1">
      <h3 className="mb-3 font-semibold">Form</h3>

      <input className="w-full mb-2 p-2 border rounded" placeholder="Judul" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Deskripsi" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Parameter 3" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Parameter 4" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Parameter 5" />

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="success" onClick={onSubmit}>
          Save
        </Button>
      </div>
    </div>
  </div>
);

/* ================= SUCCESS ================= */
const SuccessModal = ({ onClose }) => (
  <Modal>
    <div className="flex flex-col items-center gap-3">
      <div className="text-green-500 text-4xl">✔</div>
      <p>Save successful</p>
      <Button onClick={onClose}>Oke</Button>
    </div>
  </Modal>
);

/* ================= MAIN ================= */
export default function PlagiarismPages() {
  const [status, setStatus] = useState("idle");
  const [percentage, setPercentage] = useState(65);

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">

      {/* 🔥 NAVBAR FIX */}
      <div className="w-full bg-red-600 h-[80px] flex items-center px-10 text-white">

        {/* LEFT */}
        <div className="flex-1 flex items-center">
          <img src={logo} alt="logo" className="h-16 object-contain" />
        </div>

        {/* CENTER */}
        <div className="flex-1 flex justify-center gap-12 text-sm font-medium">
          <p className="cursor-pointer hover:underline">Cek plagiarisme</p>
          <p className="cursor-pointer hover:underline">Search metadata</p>
        </div>

        {/* RIGHT */}
        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
            <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
            <span className="text-xs font-medium">
              Bandung Techno Park
            </span>
          </div>
        </div>

      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">

        {status === "idle" && (
          <>
            <div className="w-[800px] h-[350px] bg-gray-300 rounded-xl flex flex-col items-center justify-center">
              <div className="text-5xl mb-3">⬆</div>
              <p>Upload file untuk cek plagiarisme</p>
            </div>

            <Button
              onClick={() => {
                setStatus("loading");
                setTimeout(() => {
                  setPercentage(65);
                  setStatus("result");
                }, 1500);
              }}
            >
              Cek Plagiarisme
            </Button>
          </>
        )}

        {status === "verification" && (
          <Verification
            onNext={() => setStatus("form")}
            onCancel={() => setStatus("idle")}
          />
        )}

        {status === "form" && (
          <Form
            onSubmit={() => setStatus("success")}
            onCancel={() => setStatus("idle")}
          />
        )}
      </div>

      {/* MODALS */}
      {status === "loading" && <LoadingModal />}

      {status === "result" && (
        <ResultModal
          percentage={percentage}
          onCancel={() => setStatus("idle")}
          onVerify={() => setStatus("verification")}
          onSave={() => setStatus("form")}
        />
      )}

      {status === "success" && (
        <SuccessModal onClose={() => setStatus("idle")} />
      )}
    </div>
  );
}