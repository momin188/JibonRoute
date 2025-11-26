import { Page, Navbar, Block, Button, Card, Link } from "konsta/react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  Calendar,
  Clock,
  Shield,
  MapPin,
  Activity,
} from "lucide-react";

const BookingHomePage = () => {
  const navigate = useNavigate();

  const handleEmergencySOS = () => {
    console.log("Emergency SOS activated!");
    // In a real app, this would bypass regular booking and dispatch immediately
    navigate("/booking/regular");
  };

  const handleRegularBooking = () => {
    navigate("/booking/regular");
  };

  return (
    <Page>
      <Navbar
        title="Book Ambulance"
        left={<Link onClick={() => navigate(-1)}>Back</Link>}
      />

      <Block className="mt-4 pb-24 space-y-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-life-green mb-2">
            JibonRoute
          </h1>
          <p className="text-gray-600 text-lg">
            Emergency Medical Services in Dhaka
          </p>
        </div>

        {/* Emergency SOS Button */}
        <div className="space-y-3">
          <Button
            large
            onClick={handleEmergencySOS}
            className="w-full bg-linear-to-r from-red-600 to-red-700 text-white py-10! rounded-3xl shadow-xl active:scale-[0.98] transition-all h-auto!"
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
                Instant ambulance dispatch
              </span>
            </div>
          </Button>
          <p className="text-center text-sm text-gray-600">
            Press for immediate emergency response - bypass all steps
          </p>
        </div>

        {/* Regular Booking Button */}
        <div className="pt-4 border-t space-y-3">
          <Button
            large
            className="w-full bg-life-green text-white py-6 rounded-xl shadow-lg"
            onClick={handleRegularBooking}
          >
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6" />
              <span className="text-xl font-semibold">Regular Booking</span>
            </div>
          </Button>
          <p className="text-center text-sm text-gray-600">
            Schedule pickup with detailed information and preferences
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-3 pt-6">
          <div className="text-center p-4 bg-white border rounded-xl">
            <Clock className="w-8 h-8 text-life-green mx-auto mb-2" />
            <div className="text-xl font-bold text-life-green mb-1">5-10</div>
            <div className="text-xs text-gray-600">Min Response</div>
          </div>
          <div className="text-center p-4 bg-white border rounded-xl">
            <Activity className="w-8 h-8 text-life-green mx-auto mb-2" />
            <div className="text-xl font-bold text-life-green mb-1">24/7</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
          <div className="text-center p-4 bg-white border rounded-xl">
            <Shield className="w-8 h-8 text-life-green mx-auto mb-2" />
            <div className="text-xl font-bold text-life-green mb-1">50+</div>
            <div className="text-xs text-gray-600">Ambulances</div>
          </div>
        </div>

        {/* Ambulance Types Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Available Ambulance Types
          </h3>
          <div className="space-y-3">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Basic Ambulance</h4>
                  <p className="text-sm text-gray-600">
                    Standard emergency transport
                  </p>
                </div>
                <span className="text-life-green font-bold">From ৳800</span>
              </div>
            </Card>

            <Card className="p-4 border-2 border-life-green/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">AC Ambulance</h4>
                    <span className="text-xs bg-life-green text-white px-2 py-0.5 rounded-full">
                      Popular
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Climate-controlled comfort
                  </p>
                </div>
                <span className="text-life-green font-bold">From ৳1500</span>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">Paramedic Ambulance</h4>
                  <p className="text-sm text-gray-600">Advanced life support</p>
                </div>
                <span className="text-life-green font-bold">From ৳2500</span>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold">ICU Ambulance</h4>
                  <p className="text-sm text-gray-600">
                    Critical care transport
                  </p>
                </div>
                <span className="text-life-green font-bold">From ৳5000</span>
              </div>
            </Card>
          </div>
        </div>

        {/* Features */}
        <div className="bg-life-green/5 border border-life-green/20 rounded-xl p-5">
          <h3 className="font-semibold mb-3">Our Features</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-life-green" />
              <span>Real-time GPS tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-life-green" />
              <span>Verified professional drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-life-green" />
              <span>Fastest route optimization</span>
            </div>
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-life-green" />
              <span>24/7 emergency support</span>
            </div>
          </div>
        </div>
      </Block>
    </Page>
  );
};

export default BookingHomePage;
