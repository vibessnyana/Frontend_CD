import { useState } from "react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Card from "../../ui/Card";
import FormField from "../../common/FormField";

const PlagiarismForm = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  return (
    <div className="flex justify-center items-center h-[70vh]">

      <Card>
        <div className="w-[400px]">

          <h2 className="text-xl font-semibold mb-4">
            Input Data
          </h2>

          <FormField label="Judul">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>

          <FormField label="Deskripsi">
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </FormField>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>

            <Button onClick={onSubmit}>
              Save
            </Button>
          </div>

        </div>
      </Card>

    </div>
  );
};

export default PlagiarismForm;