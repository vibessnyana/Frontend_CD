import Modal from "../../ui/Modal.jsx";
import ButtonCancel from "../../ui/button/ButtonCancel.jsx";
import ButtonAction from "../../ui/button/ButtonAction.jsx";

export default function PlagiarismResult({
  resultPercent,
  result,
  onCancel,
  onDetail,
}) {
  const riskLevel = result?.decision_result?.decision?.risk_level;
  const requiresReview = result?.decision_result?.decision?.requires_review;
  const canRegister = Boolean(result?.can_register);
  const registrationStatus = result?.registration_status;
  const statusColor = canRegister ? "text-green-600" : "text-red-500";

  return (
    <Modal>
      <div className="flex flex-col items-center text-center">
        <h1 className={`text-5xl font-bold mb-2 ${statusColor}`}>
          {resultPercent}%
        </h1>

        <p className="text-gray-600 mb-1">
          Tingkat Kemiripan Terdeteksi
        </p>

        {registrationStatus && (
          <p className="text-xs text-gray-500 mb-1">
            Status registrasi: <span className="font-medium capitalize">{registrationStatus}</span>
          </p>
        )}

        {riskLevel && (
          <p className="text-xs text-gray-500 mb-1">
            Risiko: <span className="font-medium capitalize">{riskLevel}</span>
            {requiresReview ? " - perlu review" : " - tidak perlu review"}
          </p>
        )}

        <p className="text-xs text-gray-400 mb-6">
          Klik "Lihat Detail" untuk melihat kemiripan
        </p>

        <div className="flex gap-3">
          <ButtonCancel onClick={onCancel} />
          <ButtonAction onClick={onDetail}>
            Lihat Detail
          </ButtonAction>
        </div>
      </div>
    </Modal>
  );
}