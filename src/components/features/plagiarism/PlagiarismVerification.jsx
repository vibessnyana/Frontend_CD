import Button from "../../ui/Button";
import Card from "../../ui/Card";

const PlagiarismVerification = ({ onNext, onCancel }) => {
  return (
    <div className="flex justify-center items-center h-[70vh]">

      <Card>
        <div className="text-center">

          <img
            src="https://via.placeholder.com/200"
            alt="preview"
            className="mb-4 rounded"
          />

          <p className="text-gray-500 mb-6">
            Hasil verifikasi konten
          </p>

          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>

            <Button onClick={onNext}>
              Next
            </Button>
          </div>

        </div>
      </Card>

    </div>
  );
};

export default PlagiarismVerification;