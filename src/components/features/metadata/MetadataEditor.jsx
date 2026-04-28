export default function MetadataEditor({ data, onSave, onCancel }) {
  return (
    <div className="bg-white p-6 rounded-xl w-[400px]">
      <h2 className="font-semibold mb-4">Edit Metadata</h2>

      <input
        className="border p-2 w-full mb-2"
        defaultValue={data["Judul KI"]}
      />

      <textarea
        className="border p-2 w-full mb-4"
        defaultValue={data.Deskripsi}
      />

      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="bg-red-500 text-white px-4 py-2 rounded">
          Cancel
        </button>

        <button onClick={onSave} className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>
    </div>
  );
}