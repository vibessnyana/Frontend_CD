export default function BaseModal({ children, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      
      {/* 🔥 BACKGROUND OVERLAY + BLUR */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
      ></div>

      {/* MODAL CONTENT */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}