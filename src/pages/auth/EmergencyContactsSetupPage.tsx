import { useState } from "react";
import {
  Page,
  Navbar,
  NavbarBackLink,
  Block,
  Button,
  List,
  ListInput,
  Link,
  Chip,
  BlockTitle,
} from "konsta/react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone as PhoneIcon, Plus, Trash2, CheckCircle } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import { $user } from "@/store/useAppStore";

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
        $user.set({
          ...$user.get(),
          isAuthenticated: true,
          user: result.user,
        });
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
        $user.set({
          ...$user.get(),
          isAuthenticated: true,
          user: result.user,
        });
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
        transparent
        left={<NavbarBackLink onClick={() => navigate(-1)} />}
        right={
          contacts.length > 0 ? (
            <Link onClick={handleSkip}>Skip</Link>
          ) : undefined
        }
      />

      <Block className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <PhoneIcon className="w-10 h-10 text-primary" />
        </div>
      </Block>

      <BlockTitle large component="h1" className="block text-center">
        Emergency Contacts
      </BlockTitle>
      <BlockTitle className="my-0 block text-center" component="p">
        Add contacts who will be notified in emergencies
      </BlockTitle>

      <Block strong inset className="px-0">
        {/* Existing Contacts */}
        {contacts.length > 0 && (
          <Block nested className="space-y-3 mb-4">
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
                  <p className="text-sm text-primary">{contact.phone}</p>
                </div>
                <Link onClick={() => removeContact(contact.id)} iconOnly>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Link>
              </div>
            ))}
          </Block>
        )}

        {/* Add Contact Form */}
        {showForm ? (
          <>
            <BlockTitle>Add New Contact</BlockTitle>

            <List nested>
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

            <BlockTitle>Relationship</BlockTitle>
            <Block nested className="grid grid-cols-3 gap-2 mb-4">
              {relationships.map((rel) => (
                <Chip
                  key={rel}
                  onClick={() =>
                    setCurrentContact({
                      ...currentContact,
                      relationship: rel,
                    })
                  }
                  className={`justify-center py-2 cursor-pointer ${
                    currentContact.relationship === rel
                      ? "bg-primary! text-white!"
                      : ""
                  }`}
                >
                  {rel}
                </Chip>
              ))}
            </Block>

            {error && (
              <Block nested className="mb-4">
                <p className="text-red-600 text-sm">{error}</p>
              </Block>
            )}

            <Block nested className="flex gap-2">
              <Button
                rounded
                large
                outline
                className="flex-1"
                onClick={() => {
                  setShowForm(false);
                  setCurrentContact({ name: "", relationship: "", phone: "" });
                  setError("");
                }}
              >
                Cancel
              </Button>
              <Button rounded large className="flex-1" onClick={addContact}>
                Add Contact
              </Button>
            </Block>
          </>
        ) : (
          <Block nested>
            <Button rounded large outline onClick={() => setShowForm(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Add Emergency Contact
            </Button>
          </Block>
        )}

        {/* Complete Button */}
        {contacts.length > 0 && !showForm && (
          <Block nested className="mt-4">
            <Button rounded large onClick={handleComplete} disabled={loading}>
              {loading ? (
                "Completing..."
              ) : (
                <>
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Complete Setup
                </>
              )}
            </Button>
          </Block>
        )}

        {/* Skip for first time users */}
        {contacts.length === 0 && !showForm && (
          <Block nested className="mt-4">
            <Button
              rounded
              large
              outline
              onClick={handleSkip}
              disabled={loading}
            >
              Skip for Now
            </Button>
          </Block>
        )}

        <Block nested className="text-center mt-4">
          <p className="text-xs text-gray-500">
            You can always add or edit emergency contacts later from your
            profile
          </p>
        </Block>
      </Block>
    </Page>
  );
};

export default EmergencyContactsSetupPage;
