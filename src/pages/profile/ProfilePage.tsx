import { useState } from "react";
import {
  Page,
  Navbar,
  NavbarBackLink,
  Block,
  BlockTitle,
  Button,
  List,
  ListItem,
  Dialog,
} from "konsta/react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Users,
  Phone,
  FileText,
  Heart,
  Edit,
  LogOut,
  Settings,
} from "lucide-react";
import { $user } from "@/store/useAppStore";
import { useStore } from "@nanostores/react";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useStore($user);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (!user) {
    navigate("/auth/login");
    return null;
  }

  const handleLogout = () => {
    $user.set({
      ...$user.get(),
      isAuthenticated: false,
      user: null,
      currentBooking: null,
    });
    navigate("/auth/login");
  };

  return (
    <Page>
      <Navbar
        title="My Profile"
        left={<NavbarBackLink onClick={() => navigate(-1)} />}
      />

      {/* Profile Header */}
      <Block inset className="bg-primary text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Block
              nested
              className="w-16 h-16 bg-white/20 rounded-3xl flex items-center justify-center"
            >
              <User className="w-8 h-8" />
            </Block>
            <div>
              <h2 className="text-xl font-bold">{user.name || "User"}</h2>
              <p className="text-sm opacity-80 mt-1">
                {user.phone || user.email}
              </p>
            </div>
          </div>
          <div
            className="p-2 bg-white/20 rounded-lg cursor-pointer active:opacity-70"
            onClick={() => navigate("/profile/edit")}
          >
            <Edit className="w-5 h-5" />
          </div>
        </div>
      </Block>

      {/* Stats */}
      <Block className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Age</p>
          <p className="text-lg font-bold text-gray-900">{user.age || "-"}</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Blood</p>
          <p className="text-lg font-bold text-gray-900">
            {user.bloodGroup || "-"}
          </p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-xs text-gray-500 mb-1">Gender</p>
          <p className="text-lg font-bold text-gray-900">
            {user.gender || "-"}
          </p>
        </div>
      </Block>

      {/* Medical Information */}
      <BlockTitle>Medical Information</BlockTitle>
      <List strong inset>
        <ListItem
          link
          chevron
          onClick={() => navigate("/profile/medical-history")}
          title="Medical History"
          subtitle={`${user.medicalHistory?.allergies?.length || 0} allergies`}
          media={
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-red-500" />
            </div>
          }
        />
        <ListItem
          link
          chevron
          onClick={() => navigate("/profile/emergency-contacts")}
          title="Emergency Contacts"
          subtitle={`${user.emergencyContacts?.length || 0} contacts`}
          media={
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-blue-500" />
            </div>
          }
        />
      </List>

      {/* Family & Documents */}
      <BlockTitle>Family & Documents</BlockTitle>
      <List strong inset>
        <ListItem
          link
          chevron
          onClick={() => navigate("/profile/family")}
          title="Family Profiles"
          subtitle="Manage family"
          media={
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-500" />
            </div>
          }
        />
        <ListItem
          link
          chevron
          onClick={() => navigate("/profile/documents")}
          title="Medical Documents"
          subtitle="Prescriptions & Reports"
          media={
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-500" />
            </div>
          }
        />
      </List>

      {/* Settings */}
      <BlockTitle>Settings</BlockTitle>
      <List strong inset>
        <ListItem
          link
          chevron
          onClick={() => navigate("/settings")}
          title="App Settings"
          media={
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Settings className="w-5 h-5 text-gray-500" />
            </div>
          }
        />
        <ListItem
          link
          onClick={() => setShowLogoutDialog(true)}
          title="Logout"
          titleWrapClassName="text-red-500"
          media={
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
          }
        />
      </List>

      <Block className="h-4" />

      {/* Logout Dialog */}
      <Dialog
        opened={showLogoutDialog}
        onBackdropClick={() => setShowLogoutDialog(false)}
        title="Logout"
        content="Are you sure you want to logout?"
        buttons={
          <>
            <Button onClick={() => setShowLogoutDialog(false)}>Cancel</Button>
            <Button onClick={handleLogout} className="text-red-500!">
              Logout
            </Button>
          </>
        }
      />
    </Page>
  );
};

export default ProfilePage;
