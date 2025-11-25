import { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Page,
  Navbar,
  Block,
  Button,
  Card,
  List,
  ListItem,
  Panel,
  Link,
  Icon,
  BlockTitle,
} from "konsta/react";
import {
  AlertCircle,
  Calendar,
  User,
  FileText,
  Users,
  Phone,
  Heart,
  Building2,
  Menu,
  Home,
  Info,
  Settings,
  LogOut,
  XIcon,
  UserIcon,
  CalendarIcon,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [leftPanelOpened, setLeftPanelOpened] = useState(false);

  return (
    <>
      <Page>
        <Navbar
          title="JibonRoute"
          subtitle="Emergency Medical Services"
          left={
            <Link
              navbar
              iconOnly
              onClick={() => setLeftPanelOpened(true)}
              aria-label="Open menu"
            >
              <Icon ios={<Menu />} />
            </Link>
          }
          right={
            <Link
              navbar
              iconOnly
              component={RouterLink}
              to="/auth"
              aria-label="Open menu"
            >
              <Icon ios={<User />} />
            </Link>
          }
        />

        <Block className="space-y-6 mt-4 pb-8">
          {/* Emergency SOS Button */}
          <Block
            className="bg-linear-to-r from-red-600 to-red-700 text-white py-10 rounded-3xl transform active:scale-[0.98] transition-all"
            onClick={() => navigate("/booking")}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                <AlertCircle className="w-16 h-16 animate-pulse" />
                <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
              </div>
              <span className="text-3xl font-bold tracking-wide">
                EMERGENCY SOS
              </span>
              <span className="text-sm opacity-90 font-medium">
                24/7 Instant Response
              </span>
            </div>
          </Block>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-5 bg-gradient-to-br from-life-green/10 to-life-green/5 rounded-2xl border border-life-green/20 shadow-sm">
              <div className="text-3xl font-bold text-life-green mb-1">
                5-10
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Min Response
              </div>
            </div>
            <div className="text-center p-5 bg-gradient-to-br from-life-green/10 to-life-green/5 rounded-2xl border border-life-green/20 shadow-sm">
              <div className="text-3xl font-bold text-life-green mb-1">
                24/7
              </div>
              <div className="text-xs text-gray-600 font-medium">Available</div>
            </div>
            <div className="text-center p-5 bg-gradient-to-br from-life-green/10 to-life-green/5 rounded-2xl border border-life-green/20 shadow-sm">
              <div className="text-3xl font-bold text-life-green mb-1">50+</div>
              <div className="text-xs text-gray-600 font-medium">
                Ambulances
              </div>
            </div>
          </div>

          {/* Quick Actions */}

          <BlockTitle>Quick Actions</BlockTitle>
          <Block className="grid grid-cols-2 gap-3 px-0!">
            <Block
              strong
              nested
              inset
              className="mx-0!"
              onClick={() => navigate("/booking/regular")}
            ></Block>

            <Block
              strong
              nested
              inset
              className="mx-0! flex flex-col items-center text-center"
              onClick={() => navigate("/auth")}
            >
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="mt-2">
                <div className="font-bold text-base">Register</div>
                <div className="text-xs text-gray-600">Create profile</div>
              </div>
            </Block>

            <Block
              strong
              nested
              inset
              className="mx-0! flex flex-col items-center text-center"
              onClick={() => navigate("/profile")}
            >
              <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center shadow-md">
                <Heart className="w-7 h-7 text-white" />
              </div>
              <div className="mt-2">
                <div className="font-bold text-base">My Health</div>
                <div className="text-xs text-gray-600">Medical records</div>
              </div>
            </Block>

            <Block
              inset
              className="mx-0! flex flex-col items-center text-center"
              strong
              nested
              onClick={() => navigate("/profile/family")}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-md">
                <Users className="w-7 h-7 text-white" />
              </div>
              <div className="mt-2">
                <div className="font-bold text-base">Family</div>
                <div className="text-xs text-gray-600">Manage profiles</div>
              </div>
            </Block>
          </Block>

          {/* Services List */}
          <BlockTitle>Our Services</BlockTitle>
          <List strong className="rounded-2xl">
            <ListItem
              link
              chevron
              onClick={() => navigate("/booking")}
              title="Emergency Ambulance"
              after="24/7"
              media={
                <div className="w-11 h-11 rounded-xl bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
              }
              subtitle="Instant dispatch for emergencies"
            />

            <ListItem
              link
              chevron
              onClick={() => navigate("/booking/regular")}
              title="Scheduled Booking"
              after="Available"
              media={
                <div className="w-11 h-11 rounded-xl bg-life-green/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-life-green" />
                </div>
              }
              subtitle="Plan your ambulance transport"
            />

            <ListItem
              link
              chevron
              onClick={() => console.log("Find hospitals")}
              title="Find Hospitals"
              after="50+"
              media={
                <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-blue-600" />
                </div>
              }
              subtitle="Locate nearest hospitals"
            />

            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/emergency-contacts")}
              title="Emergency Contacts"
              after="Manage"
              media={
                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
              }
              subtitle="Add and manage contacts"
            />

            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/documents")}
              title="Medical Documents"
              after="Upload"
              media={
                <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
              }
              subtitle="Store prescriptions & reports"
            />
          </List>

          {/* Info Banner */}
          <Block strong nested className="rounded-2xl">
            <div className="text-lg font-bold text-life-green mb-2">
              🚑 Trusted by 10,000+ Patients
            </div>
            <div className="text-sm text-gray-700 font-medium">
              Average response time: 5-10 minutes • 99% success rate
            </div>
          </Block>
        </Block>
      </Page>

      {/* Left Panel - Navigation Drawer */}
      <Panel
        side="left"
        opened={leftPanelOpened}
        onBackdropClick={() => setLeftPanelOpened(false)}
      >
        <Page>
          <Navbar
            title="Menu"
            right={
              <Link iconOnly onClick={() => setLeftPanelOpened(false)}>
                <XIcon />
              </Link>
            }
          />
          <Block className="space-y-2">
            <Card>
              <div className="grid place-items-center">
                <UserIcon className="w-8 h-8" />
              </div>
              <p className="text-center mt-1">Welcome</p>
            </Card>

            <List strongIos outlineIos className="rounded-2xl overflow-hidden">
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  navigate("/");
                }}
                title="Home"
                media={<Home className="w-5 h-5 text-life-green" />}
              />
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  navigate("/profile");
                }}
                title="My Profile"
                media={<User className="w-5 h-5 text-blue-600" />}
              />
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  navigate("/booking");
                }}
                title="Book Ambulance"
                media={<Calendar className="w-5 h-5 text-life-green" />}
              />
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  navigate("/profile/family");
                }}
                title="Family Profiles"
                media={<Users className="w-5 h-5 text-purple-600" />}
              />
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  navigate("/profile/emergency-contacts");
                }}
                title="Emergency Contacts"
                media={<Phone className="w-5 h-5 text-orange-600" />}
              />
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  navigate("/profile/documents");
                }}
                title="Medical Documents"
                media={<FileText className="w-5 h-5 text-purple-600" />}
              />
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  console.log("About");
                }}
                title="About Us"
                media={<Info className="w-5 h-5 text-gray-600" />}
              />
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  console.log("Settings");
                }}
                title="Settings"
                media={<Settings className="w-5 h-5 text-gray-600" />}
              />
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  console.log("Logout");
                }}
                title="Logout"
                media={<LogOut className="w-5 h-5 text-red-600" />}
              />
            </List>
          </Block>
        </Page>
      </Panel>
    </>
  );
};

export default Index;
