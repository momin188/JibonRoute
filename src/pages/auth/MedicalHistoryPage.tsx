import { useState } from "react";
import { Page, Navbar, Block, List, ListInput, Button, Chip } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { Heart, Plus, X } from "lucide-react";

const MedicalHistoryPage = () => {
  const navigate = useNavigate();
  const [allergies, setAllergies] = useState<string[]>([]);
  const [conditions, setConditions] = useState<string[]>([]);
  const [medications, setMedications] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [inputType, setInputType] = useState<"allergy" | "condition" | "medication" | null>(null);

  const handleAddItem = () => {
    if (!currentInput.trim()) return;

    if (inputType === "allergy") {
      setAllergies([...allergies, currentInput]);
    } else if (inputType === "condition") {
      setConditions([...conditions, currentInput]);
    } else if (inputType === "medication") {
      setMedications([...medications, currentInput]);
    }

    setCurrentInput("");
    setInputType(null);
  };

  const handleRemoveItem = (type: "allergy" | "condition" | "medication", index: number) => {
    if (type === "allergy") {
      setAllergies(allergies.filter((_, i) => i !== index));
    } else if (type === "condition") {
      setConditions(conditions.filter((_, i) => i !== index));
    } else if (type === "medication") {
      setMedications(medications.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    console.log("Medical history:", { allergies, conditions, medications });
    navigate("/profile");
  };

  return (
    <Page>
      <Navbar 
        title="Medical History" 
        left={<button onClick={() => navigate(-1)}>Back</button>}
      />
      
      <Block className="space-y-4 mt-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-life-green/10 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-life-green" />
          </div>
          <h2 className="text-xl font-bold mb-2">Medical History</h2>
          <p className="text-gray-600">Help us serve you better</p>
        </div>

        <div className="space-y-6">
          {/* Allergies */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Allergies</h3>
              <Button
                small
                onClick={() => setInputType("allergy")}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            {inputType === "allergy" && (
              <div className="mb-3">
                <List strongIos outlineIos>
                  <ListInput
                    type="text"
                    placeholder="Enter allergy (e.g., Penicillin, Peanuts)"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                    clearButton
                  />
                </List>
                <div className="flex gap-2 mt-2">
                  <Button className="flex-1" onClick={handleAddItem}>Add</Button>
                  <Button className="flex-1" outline onClick={() => setInputType(null)}>Cancel</Button>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {allergies.map((allergy, index) => (
                <Chip
                  key={index}
                  deleteButton
                  onDelete={() => handleRemoveItem("allergy", index)}
                >
                  {allergy}
                </Chip>
              ))}
            </div>
            {allergies.length === 0 && inputType !== "allergy" && (
              <p className="text-sm text-gray-500">No allergies added</p>
            )}
          </div>

          {/* Chronic Conditions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Chronic Conditions</h3>
              <Button
                small
                onClick={() => setInputType("condition")}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            {inputType === "condition" && (
              <div className="mb-3">
                <List strongIos outlineIos>
                  <ListInput
                    type="text"
                    placeholder="Enter condition (e.g., Diabetes, Hypertension)"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                    clearButton
                  />
                </List>
                <div className="flex gap-2 mt-2">
                  <Button className="flex-1" onClick={handleAddItem}>Add</Button>
                  <Button className="flex-1" outline onClick={() => setInputType(null)}>Cancel</Button>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {conditions.map((condition, index) => (
                <Chip
                  key={index}
                  deleteButton
                  onDelete={() => handleRemoveItem("condition", index)}
                >
                  {condition}
                </Chip>
              ))}
            </div>
            {conditions.length === 0 && inputType !== "condition" && (
              <p className="text-sm text-gray-500">No conditions added</p>
            )}
          </div>

          {/* Current Medications */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Current Medications</h3>
              <Button
                small
                onClick={() => setInputType("medication")}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            {inputType === "medication" && (
              <div className="mb-3">
                <List strongIos outlineIos>
                  <ListInput
                    type="text"
                    placeholder="Enter medication (e.g., Aspirin 100mg)"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddItem()}
                    clearButton
                  />
                </List>
                <div className="flex gap-2 mt-2">
                  <Button className="flex-1" onClick={handleAddItem}>Add</Button>
                  <Button className="flex-1" outline onClick={() => setInputType(null)}>Cancel</Button>
                </div>
              </div>
            )}
            <div className="flex flex-wrap gap-2">
              {medications.map((medication, index) => (
                <Chip
                  key={index}
                  deleteButton
                  onDelete={() => handleRemoveItem("medication", index)}
                >
                  {medication}
                </Chip>
              ))}
            </div>
            {medications.length === 0 && inputType !== "medication" && (
              <p className="text-sm text-gray-500">No medications added</p>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <Button
            large
            className="w-full"
            onClick={handleSubmit}
          >
            Complete Registration
          </Button>
          <Button
            large
            outline
            className="w-full"
            onClick={handleSubmit}
          >
            Skip for Now
          </Button>
        </div>
      </Block>
    </Page>
  );
};

export default MedicalHistoryPage;
