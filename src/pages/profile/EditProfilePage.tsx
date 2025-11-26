import { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListInput,
  Link,
  Chip,
} from "konsta/react";
import { useNavigate } from "react-router-dom";
import { User, Save } from "lucide-react";
import useAppStore from "@/store/useAppStore";
import { mockAuthService } from "@/services/mockAuth";

const EditProfilePage = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAppStore();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    age: user?.age?.toString() || "",
    gender: user?.gender || "",
    bloodGroup: user?.bloodGroup || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSave = async () => {
    setError("");
    setSuccess(false);

    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.bloodGroup
    ) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    try {
      const result = await mockAuthService.updateProfile(user!.id, {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        bloodGroup: formData.bloodGroup,
      } as any);

      if (result.success && result.user) {
        updateUser(result.user);
        setSuccess(true);
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
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
        title="Edit Profile"
        left={<Link onClick={() => navigate(-1)}>Cancel</Link>}
      />

      <Block className="mt-4 pb-24">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <User className="w-10 h-10 text-life-green" />
          </div>
          <h2 className="text-2xl font-bold">Update Your Profile</h2>
        </div>

        <List strongIos outlineIos className="mb-4">
          <ListInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <ListInput
            label="Age"
            type="number"
            placeholder="Enter your age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
          />
        </List>

        {/* Gender Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2 px-4">
            Gender
          </label>
          <div className="grid grid-cols-3 gap-2 px-4">
            {["Male", "Female", "Other"].map((gender) => (
              <Chip
                key={gender}
                onClick={() => setFormData({ ...formData, gender })}
                className={`p-3 rounded-lg border-2 transition-all text-center cursor-pointer ${
                  formData.gender === gender
                    ? "border-life-green bg-life-green/5"
                    : "border-gray-200"
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    formData.gender === gender
                      ? "text-life-green"
                      : "text-gray-700"
                  }`}
                >
                  {gender}
                </span>
              </Chip>
            ))}
          </div>
        </div>

        {/* Blood Group Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2 px-4">
            Blood Group
          </label>
          <div className="grid grid-cols-4 gap-2 px-4">
            {bloodGroups.map((group) => (
              <Chip
                key={group}
                onClick={() => setFormData({ ...formData, bloodGroup: group })}
                className={`p-3 rounded-lg border-2 transition-all text-center cursor-pointer ${
                  formData.bloodGroup === group
                    ? "border-life-green bg-life-green/5"
                    : "border-gray-200"
                }`}
              >
                <span
                  className={`text-lg font-bold ${
                    formData.bloodGroup === group
                      ? "text-life-green"
                      : "text-gray-700"
                  }`}
                >
                  {group}
                </span>
              </Chip>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 mx-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 mx-4">
            <p className="text-green-600 text-sm">
              Profile updated successfully!
            </p>
          </div>
        )}

        <div className="px-4">
          <Button
            large
            className="w-full bg-life-green"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </Block>
    </Page>
  );
};

export default EditProfilePage;
