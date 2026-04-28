export default function BaseModal({ children }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      {children}
    </div>
  );
}