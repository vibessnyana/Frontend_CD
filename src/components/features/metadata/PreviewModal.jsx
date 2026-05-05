import ButtonCancel from "../../ui/Button/ButtonCancel.jsx";
import ButtonAction from "../../ui/Button/ButtonAction.jsx";
import ButtonDelete from "../../ui/Button/ButtonDelete.jsx";

function Row({ label, value }) {
  return (
    <div className="flex items-start gap-4 py-2">
      <div className="w-[140px] text-gray-400 text-sm">
        {label}
      </div>
      <div className="flex-1 text-sm font-semibold text-gray-800">
        {value}
      </div>
    </div>
  );
}

export default function PreviewModal({
  data,
  onDelete,
  onEdit,
  onClose,
}) {
  return (
    <div className="bg-white w-[600px] rounded-2xl shadow-xl overflow-hidden">

      <div className="h-[80vh] overflow-y-auto p-6">

        <h2 className="text-lg font-semibold mb-4">
          Detail Metadata
        </h2>

        <div className="w-full h-[180px] bg-gray-200 rounded-lg mb-4"></div>

        <Row label="Judul" value={data["Judul KI"]} />
        <Row label="Deskripsi" value={data.Deskripsi} />

        <div className="border-t my-4"></div>

        <Row label="KI ID" value={data.ki_id} />
        <Row label="UUID" value={data.ki_uuid} />
        <Row label="Kategori" value={data.Kategori} />
        <Row label="Sub Kategori" value={data["Sub Kategori"]} />
        <Row label="Kategori HC" value={data["Kategori HC"]} />
        <Row label="Sub Kategori HC" value={data["Sub Kategori HC"]} />

        {/* 🔥 BUTTON */}
        <div className="flex justify-end gap-4 mt-6 pt-4 border-t">

          <ButtonCancel onClick={onClose}>
            Cancel
          </ButtonCancel>

          <ButtonAction onClick={onEdit}
          className="!bg-blue-500 hover:!bg-blue-600">
            Update
          </ButtonAction>

          <ButtonDelete onClick={onDelete} />

        </div>

      </div>
    </div>
  );
}