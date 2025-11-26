import { useState } from "react";
import {
  Page,
  Navbar,
  NavbarBackLink,
  Block,
  Button,
  Chip,
  Link,
  BlockTitle,
} from "konsta/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Activity, Plus } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import { $user } from "@/store/useAppStore";

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

const MedicalHistoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [allergies, setAllergies] = useState<string[]>([]);
  const [customAllergies, setCustomAllergies] = useState<string[]>([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [chronicConditions, setChronicConditions] = useState<string[]>([]);
  const [customConditions, setCustomConditions] = useState<string[]>([]);
  const [newCondition, setNewCondition] = useState("");
  const [medications, setMedications] = useState<string[]>([]);
  const [newMedication, setNewMedication] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Merge common and custom items for display
  const allAllergies = [...customAllergies, ...commonAllergies];
  const allConditions = [...customConditions, ...commonConditions];

  const addAllergy = () => {
    const trimmed = newAllergy.trim();
    if (trimmed && !allAllergies.includes(trimmed)) {
      setCustomAllergies([trimmed, ...customAllergies]);
      setAllergies([...allergies, trimmed]);
      setNewAllergy("");
    }
  };

  const addCondition = () => {
    const trimmed = newCondition.trim();
    if (trimmed && !allConditions.includes(trimmed)) {
      setCustomConditions([trimmed, ...customConditions]);
      setChronicConditions([...chronicConditions, trimmed]);
      setNewCondition("");
    }
  };

  const addMedication = () => {
    const trimmed = newMedication.trim();
    if (trimmed && !medications.includes(trimmed)) {
      setMedications([trimmed, ...medications]);
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
        $user.set({
          ...$user.get(),
          user: result.user,
        });
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
        transparent
        left={<NavbarBackLink onClick={() => navigate(-1)} />}
        right={<Link onClick={handleSkip}>Skip</Link>}
      />

      <Block className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Activity className="w-10 h-10 text-primary" />
        </div>
      </Block>

      <BlockTitle large component="h1" className="block text-center">
        Medical History
      </BlockTitle>
      <BlockTitle className="my-0 block text-center" component="p">
        Help us provide better care in emergencies
      </BlockTitle>

      <Block strong inset>
        {/* Allergies */}
        <BlockTitle className="mt-0 px-0!">Allergies</BlockTitle>
        <Block className="flex flex-wrap gap-2 mb-3 px-0!">
          {allAllergies.map((allergy) => (
            <Chip
              key={allergy}
              onClick={() => {
                if (!allergies.includes(allergy)) {
                  setAllergies([...allergies, allergy]);
                } else {
                  removeItem(allergies, setAllergies, allergy);
                }
              }}
              className={`cursor-pointer ${
                allergies.includes(allergy) ? "bg-primary! text-white!" : ""
              }`}
            >
              {allergy}
            </Chip>
          ))}
        </Block>

        <div className="text-black dark:text-white ps-4 flex items-center rounded-lg relative">
          <div className="py-3 pe-safe-4 w-full relative">
            <div className="-mt-2.5 -mb-2.5 relative">
              <input
                className="h-10 block text-base appearance-none w-full focus:outline-none bg-transparent placeholder-black/30 dark:placeholder-white/30"
                type="text"
                placeholder="Add custom allergy"
                value={newAllergy}
                onChange={(e) => setNewAllergy(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addAllergy()}
              />
            </div>
            <Link
              iconOnly
              onClick={addAllergy}
              className="absolute end-2 top-1/2 -translate-y-1/2"
            >
              <Plus />
            </Link>
          </div>
          <span className="border-black/30 dark:border-white/30 h-full border rounded-lg -z-10 pointer-events-none absolute start-0 bottom-0 duration-200 w-full"></span>
        </div>

        {/* Chronic Conditions */}
        <BlockTitle className="mt-6 px-0!">Chronic Conditions</BlockTitle>
        <Block className="flex flex-wrap gap-2 mb-3 px-0!">
          {allConditions.map((condition) => (
            <Chip
              key={condition}
              onClick={() => {
                if (!chronicConditions.includes(condition)) {
                  setChronicConditions([...chronicConditions, condition]);
                } else {
                  removeItem(
                    chronicConditions,
                    setChronicConditions,
                    condition
                  );
                }
              }}
              className={`cursor-pointer ${
                chronicConditions.includes(condition)
                  ? "bg-primary! text-white!"
                  : ""
              }`}
            >
              {condition}
            </Chip>
          ))}
        </Block>

        <div className="text-black dark:text-white ps-4 flex items-center rounded-lg relative">
          <div className="py-3 pe-safe-4 w-full relative">
            <div className="-mt-2.5 -mb-2.5 relative">
              <input
                className="h-10 block text-base appearance-none w-full focus:outline-none bg-transparent placeholder-black/30 dark:placeholder-white/30"
                type="text"
                placeholder="Add custom condition"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCondition()}
              />
            </div>
            <Link
              iconOnly
              onClick={addCondition}
              className="absolute end-2 top-1/2 -translate-y-1/2"
            >
              <Plus />
            </Link>
          </div>
          <span className="border-black/30 dark:border-white/30 h-full border rounded-lg -z-10 pointer-events-none absolute start-0 bottom-0 duration-200 w-full"></span>
        </div>

        {/* Current Medications */}
        <BlockTitle className="mt-6 px-0!">Current Medications</BlockTitle>
        <Block className="flex flex-wrap gap-2 mb-3 px-0!">
          {medications.map((medication) => (
            <Chip
              key={medication}
              onClick={() =>
                removeItem(medications, setMedications, medication)
              }
              className="cursor-pointer bg-primary! text-white!"
            >
              {medication}
            </Chip>
          ))}
        </Block>

        <div className="text-black dark:text-white ps-4 flex items-center rounded-lg relative">
          <div className="py-3 pe-safe-4 w-full relative">
            <div className="-mt-2.5 -mb-2.5 relative">
              <input
                className="h-10 block text-base appearance-none w-full focus:outline-none bg-transparent placeholder-black/30 dark:placeholder-white/30"
                type="text"
                placeholder="Add medication"
                value={newMedication}
                onChange={(e) => setNewMedication(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addMedication()}
              />
            </div>
            <Link
              iconOnly
              onClick={addMedication}
              className="absolute end-2 top-1/2 -translate-y-1/2"
            >
              <Plus />
            </Link>
          </div>
          <span className="border-black/30 dark:border-white/30 h-full border rounded-lg -z-10 pointer-events-none absolute start-0 bottom-0 duration-200 w-full"></span>
        </div>

        {error && (
          <Block nested className="mt-4">
            <p className="text-red-600 text-sm">{error}</p>
          </Block>
        )}

        <Block nested className="mt-6">
          <Button rounded large onClick={handleContinue} disabled={loading}>
            {loading ? "Saving..." : "Continue"}
          </Button>
        </Block>
      </Block>
    </Page>
  );
};

export default MedicalHistoryPage;
