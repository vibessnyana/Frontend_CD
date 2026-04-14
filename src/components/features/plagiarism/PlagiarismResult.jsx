import Button from "../../ui/Button";
import Card from "../../ui/Card";

const PlagiarismResult = ({
  percentage,
  onCancel,
  onVerify,
  onSave,
}) => {
  const isLow = percentage <= 30;
  const isMedium = percentage > 30 && percentage <= 70;

  return (
    <div className="flex justify-center items-center h-[70vh]">
      
      <Card>
        <div className="text-center">

          <h1 className="text-4xl font-bold mb-2">
            {percentage}%
          </h1>

          <p className="text-gray-500 mb-6">
            Plagiarisme terdeteksi
          </p>

          <div className="flex gap-3 justify-center">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>

            {isLow && (
              <Button onClick={onSave}>
                Save
              </Button>
            )}

            {isMedium && (
              <Button onClick={onVerify}>
                Verifikasi
              </Button>
            )}
          </div>

        </div>
      </Card>

    </div>
  );
};

export default PlagiarismResult;