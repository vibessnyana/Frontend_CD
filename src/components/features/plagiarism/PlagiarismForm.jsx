import Button from "../../ui/Button.jsx";

export default function PlagiarismForm({
  onSubmit,
  onCancel,
}) {
  return (
    <div className="w-full flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-[600px]">

        {/* TITLE */}
        <h3 className="mb-4 font-semibold text-lg text-center">
          Form
        </h3>

        {/* FORM CONTENT */}
        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">

          <input className="input" placeholder="_id" />
          <input className="input" placeholder="No" />
          <input className="input" placeholder="ki_id" />
          <input className="input" placeholder="ki_uuid" />

          <textarea className="textarea" placeholder="Judul KI" />
          <textarea className="textarea" placeholder="Deskripsi" />

          <input className="input" placeholder="Kategori" />
          <input className="input" placeholder="Sub Kategori" />
          <input className="input" placeholder="Kategori HC" />
          <input className="input" placeholder="Sub Kategori HC" />

        </div>

        {/* BUTTON */}
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
}