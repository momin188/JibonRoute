import { useNavigate } from "react-router-dom";
import { Page, Navbar, Block, Button, Card, List, ListItem } from "konsta/react";
import { AlertCircle, Calendar, User, FileText, Users, Phone, Heart, Building2 } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <Navbar 
        title="JibonRoute"
        subtitle="Emergency Medical Services"
      />
      
      <Block className="space-y-6 mt-4">
        {/* Emergency SOS Button */}
        <div className="space-y-3">
          <Button
            large
            className="w-full bg-red-600 text-white py-8 rounded-2xl shadow-lg active:shadow-xl"
            onClick={() => navigate("/booking")}
          >
            <div className="flex flex-col items-center gap-2">
              <AlertCircle className="w-12 h-12 animate-pulse" />
              <span className="text-2xl font-bold">EMERGENCY SOS</span>
              <span className="text-sm opacity-90">Instant ambulance dispatch</span>
            </div>
          </Button>
          <p className="text-center text-sm text-gray-600">
            Press for immediate emergency response
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-4 bg-life-green/10 rounded-xl">
            <div className="text-2xl font-bold text-life-green">5-10</div>
            <div className="text-xs text-gray-600">Min Response</div>
          </div>
          <div className="text-center p-4 bg-life-green/10 rounded-xl">
            <div className="text-2xl font-bold text-life-green">24/7</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
          <div className="text-center p-4 bg-life-green/10 rounded-xl">
            <div className="text-2xl font-bold text-life-green">50+</div>
            <div className="text-xs text-gray-600">Ambulances</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-bold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Card 
              className="cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => navigate("/booking/regular")}
            >
              <div className="p-4 flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-life-green/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-life-green" />
                </div>
                <div className="font-semibold">Book Ambulance</div>
                <div className="text-xs text-gray-600">Schedule pickup</div>
              </div>
            </Card>

            <Card 
              className="cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => navigate("/auth")}
            >
              <div className="p-4 flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-life-green/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-life-green" />
                </div>
                <div className="font-semibold">Register</div>
                <div className="text-xs text-gray-600">Create profile</div>
              </div>
            </Card>

            <Card 
              className="cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => navigate("/profile")}
            >
              <div className="p-4 flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-life-green/10 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-life-green" />
                </div>
                <div className="font-semibold">My Health</div>
                <div className="text-xs text-gray-600">Medical records</div>
              </div>
            </Card>

            <Card 
              className="cursor-pointer active:opacity-70 transition-opacity"
              onClick={() => navigate("/profile/family")}
            >
              <div className="p-4 flex flex-col items-center gap-2 text-center">
                <div className="w-12 h-12 rounded-full bg-life-green/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-life-green" />
                </div>
                <div className="font-semibold">Family</div>
                <div className="text-xs text-gray-600">Manage profiles</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Services List */}
        <div>
          <h2 className="text-lg font-bold mb-3">Our Services</h2>
          <List strongIos outlineIos>
            <ListItem
              link
              chevron
              onClick={() => navigate("/booking")}
              title="Emergency Ambulance"
              after="24/7"
              media={
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
              }
            >
              <div className="text-sm text-gray-600">Instant dispatch for emergencies</div>
            </ListItem>

            <ListItem
              link
              chevron
              onClick={() => navigate("/booking/regular")}
              title="Scheduled Booking"
              after="Available"
              media={
                <div className="w-10 h-10 rounded-full bg-life-green/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-life-green" />
                </div>
              }
            >
              <div className="text-sm text-gray-600">Plan your ambulance transport</div>
            </ListItem>

            <ListItem
              link
              chevron
              onClick={() => console.log("Find hospitals")}
              title="Find Hospitals"
              after="50+"
              media={
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
              }
            >
              <div className="text-sm text-gray-600">Locate nearest hospitals</div>
            </ListItem>

            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/emergency-contacts")}
              title="Emergency Contacts"
              after="Manage"
              media={
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-orange-600" />
                </div>
              }
            >
              <div className="text-sm text-gray-600">Add and manage contacts</div>
            </ListItem>

            <ListItem
              link
              chevron
              onClick={() => navigate("/profile/documents")}
              title="Medical Documents"
              after="Upload"
              media={
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
              }
            >
              <div className="text-sm text-gray-600">Store prescriptions & reports</div>
            </ListItem>
          </List>
        </div>

        {/* Info Banner */}
        <Card className="bg-life-green/5 border-life-green/20">
          <div className="p-4 text-center">
            <div className="font-semibold text-life-green mb-1">
              🚑 Trusted by 10,000+ Patients
            </div>
            <div className="text-sm text-gray-600">
              Average response time: 5-10 minutes • 99% success rate
            </div>
          </div>
        </Card>
      </Block>
    </Page>
  );
};

export default Index;
