import Button from "../../ui/Button.jsx";

export default function PlagiarismForm({ onSubmit, onCancel }) {
  return (
    <div className="w-full flex justify-center mt-6 px-4">

      {/* CARD */}
      <div className="w-full max-w-[650px] bg-white rounded-2xl shadow-md p-6 overflow-visible">

        {/* TITLE */}
        <h3 className="text-lg font-semibold text-gray-700 text-center mb-5">
          Form
        </h3>

        {/* FORM CONTENT */}
        <div className="space-y-4 max-h-[420px] overflow-y-auto px-2">

          {/* ID */}
          <div>
            <label className="label">ID</label>
            <input className="input-compact" />
          </div>

          {/* KI ID */}
          <div>
            <label className="label">KI ID</label>
            <input className="input-compact" />
          </div>

          {/* KI UUID */}
          <div>
            <label className="label">KI UUID</label>
            <input className="input-compact break-words" />
          </div>

          {/* JUDUL */}
          <div>
            <label className="label">Judul KI</label>
            <textarea className="textarea-compact" />
          </div>

          {/* DESKRIPSI */}
          <div>
            <label className="label">Deskripsi</label>
            <textarea className="textarea-compact" />
          </div>

          {/* GRID 2 KOLOM */}
          <div className="grid grid-cols-2 gap-3">

            <div>
              <label className="label">Kategori</label>
              <input className="input-compact break-words" />
            </div>

            <div>
              <label className="label">Sub Kategori</label>
              <input className="input-compact break-words" />
            </div>

            <div>
              <label className="label">Kategori HC</label>
              <input className="input-compact break-words" />
            </div>

            <div>
              <label className="label">Sub Kategori HC</label>
              <input className="input-compact break-words" />
            </div>

          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end gap-3 mt-5">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="text-sm px-4 py-2 hover:bg-red-500 hover:text-white transition"
          >
            Cancel
          </Button>

          <Button
            variant="success"
            onClick={onSubmit}
            className="text-sm px-4 py-2"
          >
            Save
          </Button>
        </div>

      </div>
    </div>
  );
}