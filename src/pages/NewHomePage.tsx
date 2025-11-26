import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListItem,
  Panel,
  Link,
  BlockTitle,
  Card,
} from "konsta/react";
import {
  AlertCircle,
  Calendar,
  User,
  Building2,
  Menu,
  Home as HomeIcon,
  Info,
  LogOut,
  X,
  Stethoscope,
  MapPin,
  Clock,
  Shield,
  Heart,
} from "lucide-react";
import { useStore } from "@nanostores/react";
import { $user } from "@/store/useAppStore";

const NewHomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useStore($user);
  const [leftPanelOpened, setLeftPanelOpened] = useState(false);

  const handleEmergencySOS = () => {
    if (!isAuthenticated) {
      navigate("/auth/login");
      return;
    }
    navigate("/booking");
  };

  const handleLogout = () => {
    $user.set({
      isAuthenticated: false,
      user: null,
      currentBooking: null,
      hasSeenOnboarding: true,
    });
    setLeftPanelOpened(false);
    navigate("/");
  };

  return (
    <>
      <Page>
        <Navbar
          title="JibonRoute"
          subtitle="Emergency Medical Services"
          left={
            <Link iconOnly onClick={() => setLeftPanelOpened(true)}>
              <Menu />
            </Link>
          }
          right={
            <Link
              iconOnly
              onClick={() =>
                navigate(isAuthenticated ? "/profile" : "/auth/login")
              }
            >
              <User />
            </Link>
          }
        />

        {/* Welcome Section */}
        {isAuthenticated && user && (
          <Block className="bg-primary text-white rounded-lg mx-4 mt-4 p-4">
            <p className="text-sm opacity-80">Welcome back,</p>
            <p className="text-xl font-bold">{user.name}</p>
            <p className="text-sm opacity-80 mt-1">
              Your health, our priority 🏥
            </p>
          </Block>
        )}

        {/* Emergency SOS Button */}
        <Block>
          <Button
            large
            className="bg-red-600! text-white! py-6! h-auto! rounded-lg!"
            onClick={handleEmergencySOS}
          >
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-10 h-10" />
              <span className="text-xl font-bold">EMERGENCY SOS</span>
              <span className="text-sm opacity-90">24/7 Instant Response</span>
            </div>
          </Button>
        </Block>

        {/* Stats Section */}
        <Block className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 bg-primary/10 rounded-xl">
            <div className="text-2xl font-bold text-primary">5-10</div>
            <div className="text-xs text-gray-600">Min Response</div>
          </div>
          <div className="text-center p-4 bg-primary/10 rounded-xl">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
          <div className="text-center p-4 bg-primary/10 rounded-xl">
            <div className="text-2xl font-bold text-primary">50+</div>
            <div className="text-xs text-gray-600">Ambulances</div>
          </div>
        </Block>

        {/* Quick Actions */}
        <BlockTitle>Quick Actions</BlockTitle>
        <Block className="grid grid-cols-2 gap-3">
          <div
            className="bg-white rounded-xl p-4 cursor-pointer active:opacity-70"
            onClick={() => navigate("/booking/regular")}
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mb-2">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <p className="font-semibold text-gray-900">Book Ride</p>
            <p className="text-xs text-gray-500">Schedule ambulance</p>
          </div>

          <div
            className="bg-white rounded-xl p-4 cursor-pointer active:opacity-70"
            onClick={() => navigate("/hospitals")}
          >
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <p className="font-semibold text-gray-900">Hospitals</p>
            <p className="text-xs text-gray-500">Find nearby</p>
          </div>

          <div
            className="bg-white rounded-xl p-4 cursor-pointer active:opacity-70"
            onClick={() => navigate("/profile")}
          >
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <p className="font-semibold text-gray-900">My Health</p>
            <p className="text-xs text-gray-500">Medical records</p>
          </div>

          <div
            className="bg-white rounded-xl p-4 cursor-pointer active:opacity-70"
            onClick={() => navigate("/ai-doctor")}
          >
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <p className="font-semibold text-gray-900">AI Doctor</p>
            <p className="text-xs text-gray-500">Get guidance</p>
          </div>
        </Block>

        {/* Services List */}
        <BlockTitle>Our Services</BlockTitle>
        <List strong inset>
          <ListItem
            link
            chevron
            onClick={() => navigate("/booking")}
            title="Emergency Ambulance"
            after="24/7"
            media={
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-red-600" />
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
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
            }
            subtitle="Plan your ambulance transport"
          />

          <ListItem
            link
            chevron
            onClick={() => navigate("/hospitals")}
            title="Hospital Directory"
            after="50+"
            media={
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
            }
            subtitle="Find hospitals by specialization"
          />

          <ListItem
            link
            chevron
            onClick={() => navigate("/tracking")}
            title="Live Tracking"
            after="Real-time"
            media={
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
            }
            subtitle="Track your ambulance"
          />
        </List>

        {/* Why Choose Us */}
        <BlockTitle>Why Choose JibonRoute?</BlockTitle>
        <List strong inset>
          <ListItem
            title="Quick Response"
            subtitle="Average 5-10 minute arrival time across Dhaka"
            media={
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
            }
          />
          <ListItem
            title="Verified Professionals"
            subtitle="All drivers and paramedics are certified"
            media={
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
            }
          />
          <ListItem
            title="Smart Routing"
            subtitle="AI-powered traffic navigation for fastest routes"
            media={
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-purple-600" />
              </div>
            }
          />
        </List>

        {/* Trust Badge */}
        <Block className="bg-primary/5 border border-primary/20 rounded-xl text-center">
          <p className="font-bold text-primary">
            🚑 Trusted by 10,000+ Patients
          </p>
          <p className="text-sm text-gray-600 mt-1">
            99% success rate • Average response: 5-10 minutes
          </p>
        </Block>

        <Block className="h-4" />
      </Page>

      {/* Navigation Drawer */}
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
                <X />
              </Link>
            }
          />

          {isAuthenticated && user ? (
            <Block className="bg-primary text-white rounded-lg mx-4 p-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                  <User className="w-7 h-7" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-lg">{user.name}</p>
                  <p className="text-sm opacity-80 mt-1">
                    {user.phone || user.email}
                  </p>
                </div>
              </div>
            </Block>
          ) : (
            <Block>
              <Button
                large
                className="rounded-lg!"
                onClick={() => {
                  setLeftPanelOpened(false);
                  navigate("/auth/login");
                }}
              >
                Login / Register
              </Button>
            </Block>
          )}

          <List strong inset>
            <ListItem
              link
              onClick={() => {
                setLeftPanelOpened(false);
                navigate("/");
              }}
              title="Home"
              media={<HomeIcon className="w-5 h-5 text-primary" />}
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
              media={<Calendar className="w-5 h-5 text-primary" />}
            />
            <ListItem
              link
              onClick={() => {
                setLeftPanelOpened(false);
                navigate("/hospitals");
              }}
              title="Hospital Directory"
              media={<Building2 className="w-5 h-5 text-blue-600" />}
            />
            <ListItem
              link
              onClick={() => {
                setLeftPanelOpened(false);
                navigate("/ai-doctor");
              }}
              title="AI Doctor Assistant"
              media={<Stethoscope className="w-5 h-5 text-purple-600" />}
            />
            <ListItem
              link
              onClick={() => {
                setLeftPanelOpened(false);
                navigate("/about");
              }}
              title="About Us"
              media={<Info className="w-5 h-5 text-gray-600" />}
            />
          </List>

          {isAuthenticated && (
            <List strong inset>
              <ListItem
                link
                onClick={handleLogout}
                title="Logout"
                media={<LogOut className="w-5 h-5 text-red-600" />}
              />
            </List>
          )}
        </Page>
      </Panel>
    </>
  );
};

export default NewHomePage;
