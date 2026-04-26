export default function ModalWrapper({ children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      {children}
    </div>
  );
}