import { useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListInput,
  Segmented,
  SegmentedButton,
  Toast,
  Link,
} from "konsta/react";
import { useNavigate, useLocation } from "react-router-dom";
import { User, Calendar, Droplet } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import useAppStore from "@/store/useAppStore";

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const login = useAppStore((state) => state.login);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    photo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleNext = () => {
    setError("");

    if (step === 1) {
      if (!formData.name) {
        setError("Name is required");
        return;
      }
      if (
        !formData.age ||
        parseInt(formData.age) < 1 ||
        parseInt(formData.age) > 120
      ) {
        setError("Please enter a valid age");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.gender) {
        setError("Please select your gender");
        return;
      }
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      navigate(-1);
    }
  };

  const handleComplete = async () => {
    setError("");

    if (!formData.bloodGroup) {
      setError("Please select your blood group");
      return;
    }

    setLoading(true);

    try {
      const result = await mockAuthService.updateProfile(userId, {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
        photo: formData.photo,
        isProfileComplete: false, // Will complete after medical history
      } as any);

      if (result.success && result.user) {
        login(result.user);
        navigate("/auth/medical-history", { state: { userId } });
      } else {
        setError(result.error || "Failed to update profile");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Navbar
        title={`Profile Setup (${step}/3)`}
        left={<Link onClick={handleBack}>Back</Link>}
      />

      <Block className="mt-4 pb-24">
        {/* Progress indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded ${
                s <= step ? "bg-life-green" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-10 h-10 text-life-green" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
              <p className="text-gray-600">
                Let's start with your basic details
              </p>
            </div>

            <List strongIos outlineIos className="mb-4">
              <ListInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <ListInput
                label="Age"
                type="number"
                placeholder="Enter your age"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
              />
            </List>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button large className="w-full bg-life-green" onClick={handleNext}>
              Next
            </Button>
          </div>
        )}

        {/* Step 2: Gender */}
        {step === 2 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-10 h-10 text-life-green" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Gender</h2>
              <p className="text-gray-600">Select your gender</p>
            </div>

            <div className="space-y-3 mb-4">
              {["Male", "Female", "Other"].map((gender) => (
                <Button
                  key={gender}
                  outline={formData.gender !== gender}
                  onClick={() => setFormData({ ...formData, gender })}
                  className={`w-full p-4! rounded-xl border-2 transition-all ${
                    formData.gender === gender
                      ? "border-life-green bg-life-green/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`text-lg font-medium ${
                      formData.gender === gender
                        ? "text-life-green"
                        : "text-gray-700"
                    }`}
                  >
                    {gender}
                  </span>
                </Button>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button large className="w-full bg-life-green" onClick={handleNext}>
              Next
            </Button>
          </div>
        )}

        {/* Step 3: Blood Group */}
        {step === 3 && (
          <div>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Droplet className="w-10 h-10 text-life-green" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Blood Group</h2>
              <p className="text-gray-600">Select your blood group</p>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-4">
              {bloodGroups.map((group) => (
                <Button
                  key={group}
                  outline={formData.bloodGroup !== group}
                  onClick={() =>
                    setFormData({ ...formData, bloodGroup: group })
                  }
                  className={`p-4! rounded-xl border-2 transition-all ${
                    formData.bloodGroup === group
                      ? "border-life-green bg-life-green/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <span
                    className={`text-xl font-bold ${
                      formData.bloodGroup === group
                        ? "text-life-green"
                        : "text-gray-700"
                    }`}
                  >
                    {group}
                  </span>
                </Button>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              large
              className="w-full bg-life-green"
              onClick={handleComplete}
              disabled={loading}
            >
              {loading ? "Saving..." : "Continue"}
            </Button>
          </div>
        )}
      </Block>
    </Page>
  );
};

export default ProfileSetupPage;
