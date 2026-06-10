import ButtonCancel from "../../ui/Button/ButtonCancel.jsx";
import ButtonAction from "../../ui/Button/ButtonAction.jsx";
import ButtonDelete from "../../ui/Button/ButtonDelete.jsx";
import ButtonLihatReport from "../../ui/Button/ButtonLihatReport.jsx";

function getCloudinaryPreviewUrl(url) {
  if (
    !url ||
    !url.includes("res.cloudinary.com") ||
    !url.includes("/image/upload/")
  ) {
    return url;
  }

  return url.replace(
    "/image/upload/",
    "/image/upload/f_auto,q_auto,w_900,c_fit/"
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-start gap-4 py-2">
      <div className="w-[140px] text-sm text-gray-400">{label}</div>

      <div className="flex-1 text-sm font-semibold text-gray-800">
        {value || "-"}
      </div>
    </div>
  );
}

export default function PreviewModal({
  data,
  onDelete,
  onEdit,
  onReport,
  onClose,
}) {
  return (
    <div className="bg-white w-[600px] rounded-2xl shadow-xl overflow-hidden">
      <div className="h-[80vh] overflow-y-auto p-6">
        <h2 className="text-lg font-semibold mb-4">Detail Metadata</h2>

        {data.image_url ? (
          <div className="w-full max-h-[350px] rounded-lg mb-4 bg-white flex items-center justify-center overflow-hidden">
            <img
              src={getCloudinaryPreviewUrl(data.image_url)}
              alt={data["Judul KI"] || "Gambar metadata"}
              width="900"
              height="600"
              decoding="async"
              className="w-full max-h-[350px] object-contain"
            />
          </div>
        ) : (
          <div className="w-full h-[180px] bg-gray-200 rounded-lg mb-4"></div>
        )}

        <Row label="Judul" value={data["Judul KI"]} />
        <Row label="Deskripsi" value={data.Deskripsi} />

        <div className="border-t my-4"></div>

        <Row label="Kategori" value={data.Kategori} />
        <Row label="Sub Kategori" value={data["Sub Kategori"]} />
        <Row label="Kategori HC" value={data["Kategori HC"]} />
        <Row label="Sub Kategori HC" value={data["Sub Kategori HC"]} />

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <ButtonCancel onClick={onClose}>Cancel</ButtonCancel>

          <ButtonLihatReport onClick={onReport}>
            Lihat Report
          </ButtonLihatReport>

          <ButtonAction
            onClick={onEdit}
            className="!bg-blue-500 hover:!bg-blue-600"
          >
            Update
          </ButtonAction>

          <ButtonDelete onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}