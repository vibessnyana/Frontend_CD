import { useEffect, useState } from "react";
import Modal from "../../ui/Modal.jsx";

const loadingSteps = [
  "Mengunggah gambar...",
  "Memvalidasi format gambar...",
  "Mengekstrak fitur visual...",
  "Mencari kemiripan eksternal...",
  "Membandingkan dengan database internal...",
  "Menyusun hasil analisis...",
];

export default function LoadingModal() {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((current) =>
        current < loadingSteps.length - 1 ? current + 1 : current
      );
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <Modal>
      <div className="w-[320px] flex flex-col items-center text-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-red-600 rounded-full animate-spin"></div>

        <h3 className="mt-4 text-base font-semibold text-gray-700">
          Sedang memproses
        </h3>

        <p className="mt-2 min-h-[20px] text-sm text-gray-500">
          {loadingSteps[stepIndex]}
        </p>

        <p className="mt-3 text-xs text-gray-400 leading-relaxed">
          Proses ini bisa memakan beberapa detik. Mohon jangan menutup halaman.
        </p>
      </div>
    </Modal>
  );
}
