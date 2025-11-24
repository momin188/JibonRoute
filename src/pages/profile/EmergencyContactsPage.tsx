import { useState } from "react";
import { Page, Navbar, Block, Button, List, ListInput, Toggle, Card } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { Phone, Plus, Edit, Trash2 } from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  autoNotify: boolean;
}

const EmergencyContactsPage = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: "1",
      name: "Jane Smith",
      relationship: "spouse",
      phone: "+880 1712345678",
      email: "jane@example.com",
      autoNotify: true
    },
    {
      id: "2",
      name: "Robert Doe",
      relationship: "parent",
      phone: "+880 1812345678",
      autoNotify: false
    }
  ]);
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(c => c.id !== id));
  };

  const handleToggleAutoNotify = (id: string) => {
    setContacts(contacts.map(c => 
      c.id === id ? { ...c, autoNotify: !c.autoNotify } : c
    ));
  };

  return (
    <Page>
      <Navbar 
        title="Emergency Contacts" 
        left={<button onClick={() => navigate(-1)}>Back</button>}
      />
      
      <Block className="mt-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Emergency Contacts</h2>
            <p className="text-sm text-gray-600">People to notify in emergencies</p>
          </div>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {contacts.map((contact) => (
            <Card key={contact.id} className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{contact.name}</h3>
                    <p className="text-sm text-gray-600 capitalize">{contact.relationship}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingContact(contact)}
                      className="text-life-green"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteContact(contact.id)}
                      className="text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <span>✉️</span>
                      <span>{contact.email}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-gray-600">Auto-notify on SOS/Booking</span>
                  <Toggle
                    checked={contact.autoNotify}
                    onChange={() => handleToggleAutoNotify(contact.id)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {contacts.length === 0 && (
          <div className="text-center py-12">
            <Phone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No emergency contacts added</p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-1" />
              Add Emergency Contact
            </Button>
          </div>
        )}

        {showAddDialog && (
          <Card className="p-4 mt-4">
            <h3 className="font-semibold mb-4">Add Emergency Contact</h3>
            <List strongIos outlineIos>
              <ListInput
                label="Name"
                type="text"
                placeholder="Contact name"
                clearButton
              />
              <ListInput
                label="Relationship"
                type="text"
                placeholder="e.g., Spouse, Parent, Friend"
                clearButton
              />
              <ListInput
                label="Phone"
                type="tel"
                placeholder="+880 1712345678"
                clearButton
              />
              <ListInput
                label="Email (Optional)"
                type="email"
                placeholder="email@example.com"
                clearButton
              />
            </List>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1">Add Contact</Button>
              <Button className="flex-1" outline onClick={() => setShowAddDialog(false)}>Cancel</Button>
            </div>
          </Card>
        )}
      </Block>
    </Page>
  );
};

export default EmergencyContactsPage;
