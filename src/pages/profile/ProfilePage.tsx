import { useState } from "react";
import { Page, Navbar, Block, Button, List, ListItem, Tabbar, TabbarLink } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { User, Users, Phone, FileText, Heart, Home, Calendar } from "lucide-react";
import PatientProfileCard from "@/components/PatientProfileCard";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("home");

  const mainProfile = {
    name: "John Doe",
    age: 35,
    bloodGroup: "A+",
    gender: "male",
    isMain: true
  };

  const familyProfiles = [
    { id: "1", name: "Jane Doe", age: 32, bloodGroup: "B+", gender: "female" },
    { id: "2", name: "Jimmy Doe", age: 8, bloodGroup: "A+", gender: "male" }
  ];

  const renderContent = () => {
    if (activeTab === "profile") {
      return (
        <Block className="mt-4 space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">My Profile</h2>
            <p className="text-gray-600">Manage your personal information</p>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-3">Primary Profile</h3>
            <PatientProfileCard {...mainProfile} />
          </div>

          <List strongIos outlineIos>
            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/medical-history")}
              title="Medical History"
              media={<Heart className="w-6 h-6 text-life-green" />}
              after="Allergies, Conditions, Medications"
            />
            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/emergency-contacts")}
              title="Emergency Contacts"
              media={<Phone className="w-6 h-6 text-life-green" />}
              after={`${3} contacts`}
            />
            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/documents")}
              title="Medical Documents"
              media={<FileText className="w-6 h-6 text-life-green" />}
              after={`${5} documents`}
            />
            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/family")}
              title="Family Profiles"
              media={<Users className="w-6 h-6 text-life-green" />}
              after={`${familyProfiles.length} members`}
            />
          </List>
        </Block>
      );
    }

    return (
      <Block className="mt-4">
        <div className="text-center py-20">
          <Home className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Welcome to JibonRoute</h2>
          <p className="text-gray-600">Your emergency ambulance service</p>
          <Button
            large
            className="mt-6"
            onClick={() => navigate("/booking")}
          >
            Book Emergency Ambulance
          </Button>
        </div>
      </Block>
    );
  };

  return (
    <Page>
      <Navbar title="JibonRoute" />
      
      {renderContent()}

      <Tabbar labels icons className="left-0 bottom-0 fixed">
        <TabbarLink
          active={activeTab === "home"}
          onClick={() => setActiveTab("home")}
          icon={<Home className="w-6 h-6" />}
          label="Home"
        />
        <TabbarLink
          active={activeTab === "booking"}
          onClick={() => {
            setActiveTab("booking");
            navigate("/booking");
          }}
          icon={<Calendar className="w-6 h-6" />}
          label="Booking"
        />
        <TabbarLink
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
          icon={<User className="w-6 h-6" />}
          label="Profile"
        />
      </Tabbar>
    </Page>
  );
};

export default ProfilePage;
