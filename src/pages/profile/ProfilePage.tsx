import { useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Dialog,
  Link,
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
  ChevronRight,
} from "lucide-react";
import useAppStore from "@/store/useAppStore";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAppStore();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  if (!user) {
    navigate("/auth/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <Page>
      <Navbar
        title="My Profile"
        left={<Link onClick={() => navigate(-1)}>Back</Link>}
      />

      <Block className="mt-4 pb-24 space-y-6">
        {/* Profile Header */}
        <div className="bg-linear-to-br from-life-green to-green-600 rounded-3xl p-6 text-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name || "User"}</h2>
                <p className="text-white/80">{user.phone || user.email}</p>
              </div>
            </div>
            <Link
              onClick={() => navigate("/profile/edit")}
              iconOnly
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30"
            >
              <Edit className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4">
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-white/70 text-xs mb-1">Age</p>
              <p className="text-lg font-bold">{user.age || "-"}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-white/70 text-xs mb-1">Blood</p>
              <p className="text-lg font-bold">{user.bloodGroup || "-"}</p>
            </div>
            <div className="bg-white/10 rounded-lg p-3 text-center">
              <p className="text-white/70 text-xs mb-1">Gender</p>
              <p className="text-lg font-bold">{user.gender || "-"}</p>
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-2">
            Medical Information
          </h3>
          <List strongIos outlineIos>
            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/medical-history")}
              title="Medical History"
              media={
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              }
              after={
                <span className="text-sm text-gray-500">
                  {user.medicalHistory?.allergies?.length || 0} allergies
                </span>
              }
            />
            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/emergency-contacts")}
              title="Emergency Contacts"
              media={
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-blue-500" />
                </div>
              }
              after={
                <span className="text-sm text-gray-500">
                  {user.emergencyContacts?.length || 0} contacts
                </span>
              }
            />
          </List>
        </div>

        {/* Family & Documents */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-2">
            Family & Documents
          </h3>
          <List strongIos outlineIos>
            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/family")}
              title="Family Profiles"
              media={
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
              }
              after={
                <span className="text-sm text-gray-500">Manage family</span>
              }
            />
            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/documents")}
              title="Medical Documents"
              media={
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-green-500" />
                </div>
              }
              after={
                <span className="text-sm text-gray-500">
                  Prescriptions & Reports
                </span>
              }
            />
          </List>
        </div>

        {/* Settings */}
        <div>
          <h3 className="text-lg font-semibold mb-3 px-2">Settings</h3>
          <List strongIos outlineIos>
            <ListItem
              link
              chevron
              onClick={() => navigate("/settings")}
              title="App Settings"
              media={
                <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                  <Settings className="w-5 h-5 text-gray-500" />
                </div>
              }
            />
            <ListItem
              link
              onClick={() => setShowLogoutDialog(true)}
              title="Logout"
              media={
                <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-500" />
                </div>
              }
              className="text-red-500"
            />
          </List>
        </div>
      </Block>

      {/* Logout Dialog */}
      <Dialog
        opened={showLogoutDialog}
        onBackdropClick={() => setShowLogoutDialog(false)}
        title="Logout"
        content="Are you sure you want to logout?"
        buttons={
          <>
            <Button onClick={() => setShowLogoutDialog(false)}>Cancel</Button>
            <Button onClick={handleLogout} className="text-red-500">
              Logout
            </Button>
          </>
        }
      />
    </Page>
  );
};

export default ProfilePage;
//         <TabbarLink
//           active={activeTab === "home"}
//           onClick={() => setActiveTab("home")}
//           icon={<Home className="w-6 h-6" />}
//           label="Home"
//         />
//         <TabbarLink
//           active={activeTab === "booking"}
//           onClick={() => {
//             setActiveTab("booking");
//             navigate("/booking");
//           }}
//           icon={<Calendar className="w-6 h-6" />}
//           label="Booking"
//         />
//         <TabbarLink
//           active={activeTab === "profile"}
//           onClick={() => setActiveTab("profile")}
//           icon={<User className="w-6 h-6" />}
//           label="Profile"
//         />
//       </Tabbar>
//     </Page>
//   );
// };

// export default ProfilePage;
