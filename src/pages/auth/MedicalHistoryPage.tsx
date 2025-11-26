import { useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListInput,
  Chip,
  Link,
} from "konsta/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Activity, Plus, X } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import useAppStore from "@/store/useAppStore";

const MedicalHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const updateUser = useAppStore((state) => state.updateUser);

  const [allergies, setAllergies] = useState<string[]>([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState("");
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const commonAllergies = [
    "Penicillin",
    "Aspirin",
    "Pollen",
    "Dust",
    "Food allergies",
  ];
  const commonConditions = [
    "Diabetes",
    "Hypertension",
    "Asthma",
    "Heart disease",
    "Arthritis",
  ];

  const addAllergy = () => {
    if (newAllergy.trim() && !allergies.includes(newAllergy.trim())) {
      setAllergies([...allergies, newAllergy.trim()]);
      setNewAllergy("");
    }
  };

  const addCondition = () => {
    if (
      newCondition.trim() &&
      !chronicConditions.includes(newCondition.trim())
    ) {
      setChronicConditions([...chronicConditions, newCondition.trim()]);
      setNewCondition("");
    }
  };

  const addMedication = () => {
    if (newMedication.trim() && !medications.includes(newMedication.trim())) {
      setMedications([...medications, newMedication.trim()]);
      setNewMedication("");
    }
  };

  const removeItem = (
    arr: string[],
    setter: (arr: string[]) => void,
    item: string
  ) => {
    setter(arr.filter((i) => i !== item));
  };

  const handleContinue = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await mockAuthService.updateProfile(userId, {
        medicalHistory: {
          allergies,
          chronicConditions,
          currentMedications: medications,
        },
      } as any);

      if (result.success && result.user) {
        updateUser(result.user);
        navigate("/auth/emergency-contacts", { state: { userId } });
      } else {
        setError(result.error || "Failed to update medical history");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate("/auth/emergency-contacts", { state: { userId } });
  };

  return (
    <Page>
      <Navbar
        title="Medical History"
        left={<Link onClick={() => navigate(-1)}>Back</Link>}
        right={<Link onClick={handleSkip}>Skip</Link>}
      />

      <Block className="mt-4 pb-24">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <Activity className="w-10 h-10 text-life-green" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Medical History</h2>
          <p className="text-gray-600">
            Help us provide better care in emergencies
          </p>
        </div>

        {/* Allergies */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Allergies</h3>

          {/* Quick add common allergies */}
          <div className="flex flex-wrap gap-2 mb-3">
            {commonAllergies.map((allergy) => (
              <Chip
                key={allergy}
                onClick={() => {
                  if (!allergies.includes(allergy)) {
                    setAllergies([...allergies, allergy]);
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  allergies.includes(allergy)
                    ? "bg-life-green text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {allergy}
              </Chip>
            ))}
          </div>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add custom allergy"
              value={newAllergy}
              onChange={(e) => setNewAllergy(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addAllergy()}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <Button onClick={addAllergy} className="bg-life-green">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* Selected allergies */}
          <div className="flex flex-wrap gap-2">
            {allergies.map((allergy) => (
              <div
                key={allergy}
                className="flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-200 rounded-full"
              >
                <span className="text-sm text-red-800">{allergy}</span>
                <Link
                  onClick={() => removeItem(allergies, setAllergies, allergy)}
                  iconOnly
                >
                  <X className="w-4 h-4 text-red-600" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Chronic Conditions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Chronic Conditions</h3>

          <div className="flex flex-wrap gap-2 mb-3">
            {commonConditions.map((condition) => (
              <Chip
                key={condition}
                onClick={() => {
                  if (!chronicConditions.includes(condition)) {
                    setChronicConditions([...chronicConditions, condition]);
                  }
                }}
                className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                  chronicConditions.includes(condition)
                    ? "bg-life-green text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {condition}
              </Chip>
            ))}
          </div>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add custom condition"
              value={newCondition}
              onChange={(e) => setNewCondition(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addCondition()}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <Button onClick={addCondition} className="bg-life-green">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {chronicConditions.map((condition) => (
              <div
                key={condition}
                className="flex items-center gap-2 px-3 py-1 bg-orange-50 border border-orange-200 rounded-full"
              >
                <span className="text-sm text-orange-800">{condition}</span>
                <Link
                  onClick={() =>
                    removeItem(
                      chronicConditions,
                      setChronicConditions,
                      condition
                    )
                  }
                  iconOnly
                >
                  <X className="w-4 h-4 text-orange-600" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Current Medications */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Current Medications</h3>

          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add medication"
              value={newMedication}
              onChange={(e) => setNewMedication(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addMedication()}
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <Button onClick={addMedication} className="bg-life-green">
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {medications.map((medication) => (
              <div
                key={medication}
                className="flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full"
              >
                <span className="text-sm text-blue-800">{medication}</span>
                <Link
                  onClick={() =>
                    removeItem(medications, setMedications, medication)
                  }
                  iconOnly
                >
                  <X className="w-4 h-4 text-blue-600" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button
          large
          className="w-full bg-life-green"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Saving..." : "Continue"}
        </Button>
      </Block>
    </Page>
  );
};

export default MedicalHistoryPage;
