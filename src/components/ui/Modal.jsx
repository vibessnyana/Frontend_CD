const Modal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-modal-backdrop">
      <div className="bg-white p-6 rounded-xl shadow-lg relative min-w-[300px] animate-modal-panel">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-3 text-gray-500 hover:text-red-500"
          >
            x
          </button>
        )}

        {children}
      </div>
    </div>
  );
};

export default Modal;
