import { useState } from "react";
import logo from "../assets/logo1.png";

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
      className={`px-6 py-2 rounded-md text-sm font-medium ${styles[variant]}`}
    >
      {children}
    </button>
  );
};

/* ================= MODAL ================= */
const Modal = ({ children }) => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] text-center">
      {children}
    </div>
  </div>
);

/* ================= LOADING ================= */
const LoadingModal = () => (
  <Modal>
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-red-600 rounded-full animate-spin"></div>
      <p className="text-sm text-gray-500">Processing...</p>
    </div>
  </Modal>
);

/* ================= RESULT ================= */
const ResultModal = ({ percentage, onCancel, onDetail }) => {
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

      <p className="text-gray-500 mb-2">
        Terdeteksi Plagiarisme
      </p>

      <p className="text-xs text-gray-400 mb-6">
        Klik "Lihat Detail" untuk melihat kemiripan
      </p>

      <div className="flex justify-center gap-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        <Button variant="success" onClick={onDetail}>
          Lihat Detail
        </Button>
      </div>
    </Modal>
  );
};

/* ================= UPLOAD BOX (FIXED) ================= */
const UploadBox = ({ file, setFile }) => {
  const [preview, setPreview] = useState(null);

  const handleFile = (f) => {
    if (!f.type.startsWith("image/")) {
      alert("Hanya file gambar!");
      return;
    }

    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  };

  const handleChange = (e) => {
    const f = e.target.files[0];
    if (f) handleFile(f);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById("fileInput").click()}
      className="w-[800px] h-[350px] border-2 border-dashed border-gray-400 rounded-2xl bg-gray-100 cursor-pointer flex items-center justify-center p-6"
    >
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        hidden
        onChange={handleChange}
      />

      {preview ? (
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={preview}
            className="max-h-full max-w-full object-contain rounded-lg"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="text-5xl mb-3">⬆</div>
          <p className="text-lg text-gray-600">
            Drag & drop gambar atau klik untuk upload
          </p>
        </div>
      )}
    </div>
  );
};

/* ================= SIMILARITY ITEM ================= */
const SimilarityItem = ({ img, percent }) => (
  <div className="flex items-center gap-3 mb-3">
    <img src={img} className="w-14 h-14 object-cover rounded-md" />
    <span className="text-sm font-medium">{percent}%</span>
  </div>
);

/* ================= DETAIL ================= */
const DetailPage = ({ onVerify, onCancel }) => {
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

        <p className="text-xs text-gray-500 mt-4">
          Klik "Verifikasi" untuk melanjutkan proses penyimpanan metadata karya.
        </p>

        <div className="flex justify-end gap-3 mt-3">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>

          <Button variant="success" onClick={onVerify}>
            Verifikasi
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

      <input className="w-full mb-2 p-2 border rounded" placeholder="No" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="ki_id" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="ki_uuid" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Judul KI" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Deskripsi" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Kategori" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Sub Kategori" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Kategori HC" />
      <input className="w-full mb-2 p-2 border rounded" placeholder="Sub Kategori HC" />

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
  const [file, setFile] = useState(null);
  const [percentage, setPercentage] = useState(65);

  return (
    <div className="w-full min-h-screen bg-gray-200 flex flex-col">

      {/* NAVBAR */}
      <div className="w-full bg-red-600 h-[60px] flex items-center px-10 text-white">
        <div className="flex-1 flex items-center">
          <img src={logo} className="h-12 object-contain" />
        </div>

        <div className="flex-1 flex justify-center gap-12 text-sm font-medium">
          <p>Cek plagiarisme</p>
          <p>Search metadata</p>
        </div>

        <div className="flex-1 flex justify-end">
          <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg">
            <div className="w-7 h-7 bg-gray-300 rounded-full"></div>
            <span className="text-sm">Bandung Techno Park</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 flex flex-col items-center justify-center gap-10">

        {status === "idle" && (
          <>
            <UploadBox file={file} setFile={setFile} />

            <Button
              onClick={() => {
                if (!file) {
                  alert("Upload gambar dulu!");
                  return;
                }

                setStatus("loading");

                setTimeout(() => {
                  setStatus("result");
                }, 1500);
              }}
            >
              Cek Plagiarisme
            </Button>
          </>
        )}

        {status === "detail" && (
          <DetailPage
            onVerify={() => setStatus("form")}
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
          onDetail={() => setStatus("detail")}
        />
      )}

      {status === "success" && (
        <SuccessModal onClose={() => setStatus("idle")} />
      )}

    </div>
  );
}