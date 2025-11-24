import { useState } from "react";
import { Page, Navbar, Block, Button, List, ListItem } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { Users, Plus } from "lucide-react";
import PatientProfileCard from "@/components/PatientProfileCard";

const FamilyProfilesPage = () => {
  const navigate = useNavigate();
  const [familyMembers] = useState([
    { id: "1", name: "Jane Doe", age: 32, bloodGroup: "B+", gender: "female", isMain: false },
    { id: "2", name: "Jimmy Doe", age: 8, bloodGroup: "A+", gender: "male", isMain: false },
    { id: "3", name: "Jenny Doe", age: 5, bloodGroup: "O+", gender: "female", isMain: false }
  ]);

  return (
    <Page>
      <Navbar 
        title="Family Profiles" 
        left={<button onClick={() => navigate(-1)}>Back</button>}
      />
      
      <Block className="mt-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Family Members</h2>
            <p className="text-sm text-gray-600">Manage family member profiles</p>
          </div>
          <Button
            onClick={() => navigate("/profile/family/add")}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="space-y-3">
          {familyMembers.map((member) => (
            <PatientProfileCard
              key={member.id}
              {...member}
              onClick={() => navigate(`/profile/family/${member.id}`)}
            />
          ))}
        </div>

        {familyMembers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No family members added yet</p>
            <Button onClick={() => navigate("/profile/family/add")}>
              <Plus className="w-4 h-4 mr-1" />
              Add Family Member
            </Button>
          </div>
        )}
      </Block>
    </Page>
  );
};

export default FamilyProfilesPage;
