import { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavbarBackLink,
  Block,
  Button,
  List,
  ListInput,
  BlockTitle,
  Chip,
} from "konsta/react";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";
import { User, Droplet } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import { $user } from "@/store/useAppStore";

const ProfileSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

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

  // Get name from localStorage if available (from registration)
  useEffect(() => {
    const tempName = localStorage.getItem("tempUserName");
    if (tempName) {
      setFormData((prev) => ({ ...prev, name: tempName }));
      localStorage.removeItem("tempUserName");
    }
  }, []);

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
        isProfileComplete: false,
      } as any);

      if (result.success && result.user) {
        $user.set({
          ...$user.get(),
          isAuthenticated: true,
          user: result.user,
        });
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
        transparent
        title={`Step ${step} of 3`}
        left={<NavbarBackLink onClick={handleBack} />}
      />

      {/* Progress indicator */}
      <Block className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`flex-1 h-1 rounded ${
              s <= step ? "bg-primary" : "bg-gray-200"
            }`}
          />
        ))}
      </Block>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <>
          <Block className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-primary" />
            </div>
          </Block>

          <BlockTitle large component="h1" className="block text-center">
            Basic Information
          </BlockTitle>
          <BlockTitle className="my-0 block text-center" component="p">
            Let's start with your basic details
          </BlockTitle>

          <Block strong inset className="px-0">
            <List nested>
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
                error={
                  error && (
                    <Block nested className="mt-2 mb-0">
                      <p className="text-red-600 text-sm">{error}</p>
                    </Block>
                  )
                }
              />
            </List>

            <Block nested>
              <Button rounded large onClick={handleNext}>
                Next
              </Button>
            </Block>
          </Block>
        </>
      )}

      {/* Step 2: Gender */}
      {step === 2 && (
        <>
          <Block className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <User className="w-10 h-10 text-primary" />
            </div>
          </Block>

          <BlockTitle large component="h1" className="block text-center">
            Gender
          </BlockTitle>
          <BlockTitle className="my-0 block text-center" component="p">
            Select your gender
          </BlockTitle>

          <Block strong inset className="px-0">
            <Block nested className="flex flex-col gap-3 mb-4">
              {["Male", "Female", "Other"].map((gender) => (
                <Button
                  key={gender}
                  rounded
                  large
                  outline={formData.gender !== gender}
                  onClick={() => setFormData({ ...formData, gender })}
                >
                  {gender}
                </Button>
              ))}
            </Block>

            {error && (
              <Block nested className="mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </Block>
            )}

            <Block nested>
              <Button rounded large onClick={handleNext}>
                Next
              </Button>
            </Block>
          </Block>
        </>
      )}

      {/* Step 3: Blood Group */}
      {step === 3 && (
        <>
          <Block className="text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Droplet className="w-10 h-10 text-primary" />
            </div>
          </Block>

          <BlockTitle large component="h1" className="block text-center">
            Blood Group
          </BlockTitle>
          <BlockTitle className="my-0 block text-center" component="p">
            Select your blood group
          </BlockTitle>

          <Block strong inset className="px-0">
            <Block nested className="grid grid-cols-4 gap-3 mb-4">
              {bloodGroups.map((group) => (
                <Chip
                  key={group}
                  onClick={() =>
                    setFormData({ ...formData, bloodGroup: group })
                  }
                  className={`justify-center py-3 text-lg font-bold cursor-pointer ${
                    formData.bloodGroup === group
                      ? "bg-primary! text-white!"
                      : ""
                  }`}
                >
                  {group}
                </Chip>
              ))}
            </Block>

            {error && (
              <Block nested className="mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </Block>
            )}

            <Block nested>
              <Button rounded large onClick={handleComplete} disabled={loading}>
                {loading ? "Saving..." : "Continue"}
              </Button>
            </Block>
          </Block>
        </>
      )}
    </Page>
  );
};

export default ProfileSetupPage;
