import { useState } from "react";
import { Page, Navbar, Block, List, ListInput, Button, Card, Toast } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { User, Plus, X } from "lucide-react";
import useAppStore from "@/store/useAppStore";

interface EmergencyContact {
  name: string;
  phone: string;
  relationship: string;
}

const ProfileCreationPage = () => {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [gender, setGender] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [showAddContact, setShowAddContact] = useState(false);
  const [toastOpened, setToastOpened] = useState(false);
  const [newContact, setNewContact] = useState<EmergencyContact>({
    name: "",
    phone: "",
    relationship: ""
  });

  const handleAddContact = () => {
    if (newContact.name && newContact.phone && newContact.relationship) {
      setEmergencyContacts([...emergencyContacts, newContact]);
      setNewContact({ name: "", phone: "", relationship: "" });
      setShowAddContact(false);
    }
  };

  const handleRemoveContact = (index: number) => {
    setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Save user data to store
    login({
      name,
      phone: "+880 1712345678", // From previous step
      age: parseInt(age),
      bloodGroup,
      gender
    });
    
    setToastOpened(true);
    setTimeout(() => {
      navigate("/auth/medical-history");
    }, 1000);
  };

  return (
    <Page>
      <Navbar 
        title="Create Profile" 
        left={<button onClick={() => navigate(-1)}>Back</button>}
      />
      
      <Block className="space-y-4 mt-4">
        <div className="text-center mb-6">
          <div className="w-20 h-20 rounded-full bg-life-green/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-life-green" />
          </div>
          <h2 className="text-xl font-bold mb-2">Personal Information</h2>
          <p className="text-gray-600">Tell us about yourself</p>
        </div>

        <List strongIos outlineIos>
          <ListInput
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            clearButton
          />
          
          <ListInput
            label="Age"
            type="number"
            placeholder="Enter your age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            clearButton
          />

          <ListInput
            label="Blood Group"
            type="select"
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </ListInput>

          <ListInput
            label="Gender"
            type="select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </ListInput>
        </List>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Emergency Contacts</h3>
            <Button
              small
              onClick={() => setShowAddContact(!showAddContact)}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Contact
            </Button>
          </div>

          {showAddContact && (
            <Card className="mb-4 p-4">
              <List strongIos outlineIos>
                <ListInput
                  label="Name"
                  type="text"
                  placeholder="Contact name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                  clearButton
                />
                <ListInput
                  label="Phone"
                  type="tel"
                  placeholder="Phone number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                  clearButton
                />
                <ListInput
                  label="Relationship"
                  type="text"
                  placeholder="e.g., Spouse, Parent, Sibling"
                  value={newContact.relationship}
                  onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                  clearButton
                />
              </List>
              <div className="flex gap-2 mt-3">
                <Button className="flex-1" onClick={handleAddContact}>Add</Button>
                <Button className="flex-1" outline onClick={() => setShowAddContact(false)}>Cancel</Button>
              </div>
            </Card>
          )}

          {emergencyContacts.length > 0 && (
            <div className="space-y-2">
              {emergencyContacts.map((contact, index) => (
                <Card key={index} className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold">{contact.name}</div>
                      <div className="text-sm text-gray-600">{contact.phone}</div>
                      <div className="text-xs text-gray-500 capitalize">{contact.relationship}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveContact(index)}
                      className="text-red-500 ml-2"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        <Button
          large
          className="w-full mt-6"
          disabled={!name || !age || !bloodGroup || !gender}
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </Block>

      <Toast
        position="center"
        opened={toastOpened}
        onClose={() => setToastOpened(false)}
      >
        <div className="text-center">
          ✓ Profile created successfully!
        </div>
      </Toast>
    </Page>
  );
};

export default ProfileCreationPage;
