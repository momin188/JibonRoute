import { Card, List, ListItem, Button, Badge } from "konsta/react";
import { Phone, Mail, User, Edit, Trash2 } from "lucide-react";

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  autoNotify: boolean;
}

interface EmergencyContactListProps {
  contacts: EmergencyContact[];
  onEdit: (contact: EmergencyContact) => void;
  onDelete: (contactId: string) => void;
}

const EmergencyContactList = ({ contacts, onEdit, onDelete }: EmergencyContactListProps) => {
  return (
    <div className="space-y-3">
      {contacts.map((contact) => (
        <Card key={contact.id}>
          <div className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold">{contact.name}</h4>
                  {contact.autoNotify && (
                    <Badge colors={{ bg: "bg-gray-100", text: "text-gray-800" }}>
                      Auto-notify
                    </Badge>
                  )}
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="capitalize">{contact.relationship}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                  {contact.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>{contact.email}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  outline
                  small
                  onClick={() => onEdit(contact)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  outline
                  small
                  onClick={() => onDelete(contact.id)}
                  className="text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EmergencyContactList;
