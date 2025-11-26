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
  FileText,
  Users,
  Phone,
  Heart,
  Building2,
  Menu,
  Home as HomeIcon,
  Info,
  Settings,
  LogOut,
  X,
  Stethoscope,
  MapPin,
  Clock,
  Shield,
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

        <Block className="space-y-6 mt-4 pb-8">
          {/* Welcome Section */}
          {isAuthenticated && user && (
            <div className="bg-linear-to-r from-life-green to-green-600 text-white rounded-2xl p-5">
              <h3 className="text-lg font-semibold mb-1">Welcome back,</h3>
              <p className="text-2xl font-bold">{user.name}</p>
              <p className="text-sm text-white/80 mt-1">
                Your health, our priority 🏥
              </p>
            </div>
          )}

          {/* Emergency SOS Button */}
          <Button
            large
            className="bg-linear-to-r from-red-600 to-red-700 text-white py-10! rounded-3xl shadow-xl active:scale-[0.98] transition-all h-auto!"
            onClick={handleEmergencySOS}
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
          </Button>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-5 bg-linear-to-br from-life-green/10 to-life-green/5 rounded-2xl border border-life-green/20">
              <div className="text-3xl font-bold text-life-green mb-1">
                5-10
              </div>
              <div className="text-xs text-gray-600 font-medium">
                Min Response
              </div>
            </div>
            <div className="text-center p-5 bg-linear-to-br from-life-green/10 to-life-green/5 rounded-2xl border border-life-green/20">
              <div className="text-3xl font-bold text-life-green mb-1">
                24/7
              </div>
              <div className="text-xs text-gray-600 font-medium">Available</div>
            </div>
            <div className="text-center p-5 bg-linear-to-br from-life-green/10 to-life-green/5 rounded-2xl border border-life-green/20">
              <div className="text-3xl font-bold text-life-green mb-1">50+</div>
              <div className="text-xs text-gray-600 font-medium">
                Ambulances
              </div>
            </div>
          </div>

          {/* Quick Actions Grid */}
          <div>
            <h3 className="text-lg font-bold mb-3 px-2">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button
                clear
                onClick={() => navigate("/booking/regular")}
                className="bg-white! border rounded-2xl p-4! text-left hover:shadow-md transition-shadow h-auto! justify-start! flex-col items-start"
              >
                <div className="w-12 h-12 bg-linear-to-br from-life-green to-green-600 rounded-xl flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-base text-gray-900">
                  Book Ride
                </div>
                <div className="text-xs text-gray-600">Schedule ambulance</div>
              </Button>

              <Button
                clear
                onClick={() => navigate("/hospitals")}
                className="bg-white! border rounded-2xl p-4! text-left hover:shadow-md transition-shadow h-auto! justify-start! flex-col items-start"
              >
                <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-base text-gray-900">
                  Hospitals
                </div>
                <div className="text-xs text-gray-600">Find nearby</div>
              </Button>

              <Button
                clear
                onClick={() => navigate("/profile")}
                className="bg-white! border rounded-2xl p-4! text-left hover:shadow-md transition-shadow h-auto! justify-start! flex-col items-start"
              >
                <div className="w-12 h-12 bg-linear-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-base text-gray-900">
                  My Health
                </div>
                <div className="text-xs text-gray-600">Medical records</div>
              </Button>

              <Button
                clear
                onClick={() => navigate("/ai-doctor")}
                className="bg-white! border rounded-2xl p-4! text-left hover:shadow-md transition-shadow h-auto! justify-start! flex-col items-start"
              >
                <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div className="font-bold text-base text-gray-900">
                  AI Doctor
                </div>
                <div className="text-xs text-gray-600">Get guidance</div>
              </Button>
            </div>
          </div>

          {/* Services List */}
          <div>
            <h3 className="text-lg font-bold mb-3 px-2">Our Services</h3>
            <List strongIos outlineIos>
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
                onClick={() => navigate("/hospitals")}
                title="Hospital Directory"
                after="50+"
                media={
                  <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
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
                  <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                }
                subtitle="Track your ambulance"
              />
            </List>
          </div>

          {/* Why Choose Us */}
          <div>
            <h3 className="text-lg font-bold mb-3 px-2">
              Why Choose JibonRoute?
            </h3>
            <div className="space-y-3">
              <div className="bg-white border rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Quick Response</h4>
                  <p className="text-sm text-gray-600">
                    Average 5-10 minute arrival time across Dhaka
                  </p>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Verified Professionals</h4>
                  <p className="text-sm text-gray-600">
                    All drivers and paramedics are certified
                  </p>
                </div>
              </div>

              <div className="bg-white border rounded-xl p-4 flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Smart Routing</h4>
                  <p className="text-sm text-gray-600">
                    AI-powered traffic navigation for fastest routes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="bg-life-green/5 border border-life-green/20 rounded-2xl p-5 text-center">
            <div className="text-lg font-bold text-life-green mb-2">
              🚑 Trusted by 10,000+ Patients
            </div>
            <div className="text-sm text-gray-700">
              99% success rate • Average response: 5-10 minutes
            </div>
          </div>
        </Block>
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
          <Block className="space-y-4">
            {isAuthenticated && user ? (
              <Card className="bg-linear-to-br from-life-green to-green-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{user.name}</p>
                    <p className="text-sm text-white/80">
                      {user.phone || user.email}
                    </p>
                  </div>
                </div>
              </Card>
            ) : (
              <Card>
                <div className="text-center">
                  <Button
                    large
                    className="w-full bg-life-green"
                    onClick={() => {
                      setLeftPanelOpened(false);
                      navigate("/auth/login");
                    }}
                  >
                    Login / Register
                  </Button>
                </div>
              </Card>
            )}

            <List strongIos outlineIos>
              <ListItem
                link
                onClick={() => {
                  setLeftPanelOpened(false);
                  navigate("/");
                }}
                title="Home"
                media={<HomeIcon className="w-5 h-5 text-life-green" />}
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
              {isAuthenticated && (
                <ListItem
                  link
                  onClick={() => {
                    setLeftPanelOpened(false);
                    // Handle logout
                  }}
                  title="Logout"
                  media={<LogOut className="w-5 h-5 text-red-600" />}
                />
              )}
            </List>
          </Block>
        </Page>
      </Panel>
    </>
  );
};

export default NewHomePage;
