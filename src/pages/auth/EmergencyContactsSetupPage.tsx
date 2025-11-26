import { useState } from "react";
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
import { useNavigate, useLocation } from "react-router-dom";
import { Phone as PhoneIcon, Plus, Trash2, CheckCircle } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import useAppStore from "@/store/useAppStore";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
}

const EmergencyContactsSetupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;
  const updateUser = useAppStore((state) => state.updateUser);

  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [currentContact, setCurrentContact] = useState({
    name: "",
    relationship: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const relationships = [
    "Spouse",
    "Parent",
    "Sibling",
    "Child",
    "Friend",
    "Other",
  ];

  const addContact = () => {
    if (
      !currentContact.name ||
      !currentContact.relationship ||
      !currentContact.phone
    ) {
      setError("All fields are required");
      return;
    }

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      ...currentContact,
    };

    setContacts([...contacts, newContact]);
    setCurrentContact({ name: "", relationship: "", phone: "" });
    setShowForm(false);
    setError("");
  };

  const removeContact = (id: string) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleComplete = async () => {
    setLoading(true);
    setError("");

    try {
      const result = await mockAuthService.updateProfile(userId, {
        emergencyContacts: contacts,
        isProfileComplete: true,
      } as any);

      if (result.success && result.user) {
        updateUser(result.user);
        navigate("/");
      } else {
        setError(result.error || "Failed to save emergency contacts");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    setLoading(true);
    try {
      const result = await mockAuthService.updateProfile(userId, {
        isProfileComplete: true,
      } as any);

      if (result.success && result.user) {
        updateUser(result.user);
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Navbar
        title="Emergency Contacts"
        left={<Link onClick={() => navigate(-1)}>Back</Link>}
        right={contacts.length > 0 && <Link onClick={handleSkip}>Skip</Link>}
      />

      <Block className="mt-4 pb-24">
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <PhoneIcon className="w-10 h-10 text-life-green" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Emergency Contacts</h2>
          <p className="text-gray-600">
            Add contacts who will be notified in case of emergency
          </p>
        </div>

        {/* Existing Contacts */}
        {contacts.length > 0 && (
          <div className="mb-6 space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white border rounded-xl p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {contact.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {contact.relationship}
                  </p>
                  <p className="text-sm text-life-green">{contact.phone}</p>
                </div>
                <Link
                  onClick={() => removeContact(contact.id)}
                  iconOnly
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <Trash2 className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Add Contact Form */}
        {showForm ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Add New Contact</h3>

            <List strongIos outlineIos className="mb-4">
              <ListInput
                label="Name"
                type="text"
                placeholder="Contact name"
                value={currentContact.name}
                onChange={(e) =>
                  setCurrentContact({ ...currentContact, name: e.target.value })
                }
              />

              <ListInput
                label="Phone"
                type="tel"
                placeholder="+880 1XXX-XXXXXX"
                value={currentContact.phone}
                onChange={(e) =>
                  setCurrentContact({
                    ...currentContact,
                    phone: e.target.value,
                  })
                }
              />
            </List>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              <div className="grid grid-cols-3 gap-2">
                {relationships.map((rel) => (
                  <Chip
                    key={rel}
                    onClick={() =>
                      setCurrentContact({
                        ...currentContact,
                        relationship: rel,
                      })
                    }
                    className={`px-3 py-2 rounded-lg text-sm cursor-pointer text-center ${
                      currentContact.relationship === rel
                        ? "bg-life-green text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {rel}
                  </Chip>
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button
                className="flex-1"
                outline
                onClick={() => {
                  setShowForm(false);
                  setCurrentContact({ name: "", relationship: "", phone: "" });
                  setError("");
                }}
              >
                Cancel
              </Button>
              <Button className="flex-1 bg-life-green" onClick={addContact}>
                Add Contact
              </Button>
            </div>
          </div>
        ) : (
          <Button
            large
            outline
            className="w-full mb-6"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Emergency Contact
          </Button>
        )}

        {/* Complete Button */}
        {contacts.length > 0 && !showForm && (
          <Button
            large
            className="w-full bg-life-green"
            onClick={handleComplete}
            disabled={loading}
          >
            {loading ? (
              "Completing..."
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Setup
              </>
            )}
          </Button>
        )}

        {/* Skip for first time users */}
        {contacts.length === 0 && !showForm && (
          <Button
            large
            outline
            className="w-full"
            onClick={handleSkip}
            disabled={loading}
          >
            Skip for Now
          </Button>
        )}

        <p className="text-xs text-gray-500 text-center mt-4">
          You can always add or edit emergency contacts later from your profile
        </p>
      </Block>
    </Page>
  );
};

export default EmergencyContactsSetupPage;
