export default function BaseModal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* OVERLAY */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      ></div>

      {/* MODAL */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">

        {/* CONTENT (NO SCROLL HERE ❌) */}
        <div
          className="bg-transparent"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>

      </div>
    </div>
  );
}