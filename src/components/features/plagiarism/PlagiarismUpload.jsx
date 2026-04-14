import Button from "../../ui/Button";

const PlagiarismUpload = ({ onUpload }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] border-2 border-dashed rounded-xl">

      <div className="text-6xl mb-4">📄</div>

      <p className="text-gray-500 mb-4">
        Upload file untuk cek plagiarisme
      </p>

      <Button onClick={onUpload}>
        Upload & Check
      </Button>
    </div>
  );
};

export default PlagiarismUpload;