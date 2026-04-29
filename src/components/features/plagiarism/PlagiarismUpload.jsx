export default function PlagiarismUpload({ preview, setFile, setPreview }) {
  const handleFile = (f) => {
    if (!f.type.startsWith("image/")) {
      alert("Hanya gambar!");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  return (
    <div
      onClick={() => document.getElementById("fileInput").click()}
      className="w-[800px] h-[350px] border-2 border-dashed border-gray-400 rounded-2xl bg-gray-100 flex items-center justify-center cursor-pointer p-6"
    >
      <input
        id="fileInput"
        type="file"
        hidden
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {preview ? (
        <img
          src={preview}
          className="max-h-full max-w-full object-contain rounded-lg"
        />
      ) : (
        <p>Drag & drop gambar atau klik untuk upload</p>
      )}
    </div>
  );
}