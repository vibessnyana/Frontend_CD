function formatPercent(value) {
  if (value === undefined || value === null) return "-";
  return `${Number((Number(value) * 100).toFixed(2))}%`;
}

function InfoRow({ label, value }) {
  return (
    <div className="min-w-0">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-700 break-all leading-relaxed">
        {value || "-"}
      </p>
    </div>
  );
}

export default function SimilarityDetailModal({ item, onClose }) {
  const raw = item?.raw || {};
  const sourceUrl = raw.source_url || item?.sourceUrl;

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 px-4">
      <div className="w-[760px] max-w-[95vw] overflow-hidden rounded-xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <p className="text-xs font-medium uppercase text-red-500">
              Similarity Detail
            </p>
            <h3 className="text-lg font-semibold text-gray-800">
              Informasi Gambar
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm text-gray-400 hover:bg-gray-100 hover:text-gray-700"
          >
            x
          </button>
        </div>

        <div className="grid grid-cols-[240px_minmax(0,1fr)] gap-5 p-5">
          <div className="min-w-0">
            <div className="h-[220px] rounded-lg bg-gray-100 p-2 flex items-center justify-center overflow-hidden">
            {item.img ? (
              <img
                src={item.img}
                alt={item.title || "similarity detail"}
                className="max-h-full max-w-full rounded-md object-contain"
              />
            ) : (
              <span className="text-sm text-gray-400">Tidak ada gambar</span>
            )}
            </div>
          </div>

          <div className="min-w-0 space-y-3 ">
            <InfoRow label="Judul" value={item.title || raw.title} />
            <InfoRow label="Sumber" value={raw.source || "-"} />
            <InfoRow label="Owner" value={raw.owner || item.owner} />
            <InfoRow label="Image ID" value={raw.image_id} />

            <div className="grid grid-cols-3 gap-3 rounded-lg bg-gray-50 p-3 min-w-0">
              <InfoRow label="Skor Akhir" value={formatPercent(raw.final_score)} />
              <InfoRow label="Konteks Visual" value={formatPercent(raw.clip_score)} />
              <InfoRow label="Detail Visual" value={formatPercent(raw.cnn_score)} />
            </div>

            <InfoRow label="Image URL" value={raw.image_url || item.img} />
            <div className="flex justify-center gap-2">
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-md bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Buka sumber
              </a>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
