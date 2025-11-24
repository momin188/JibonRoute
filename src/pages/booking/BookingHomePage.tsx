import { Page, Navbar, Block, Button } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Calendar } from "lucide-react";

const BookingHomePage = () => {
  const navigate = useNavigate();

  const handleEmergencySOS = () => {
    console.log("Emergency SOS activated!");
    navigate("/booking/emergency");
  };

  const handleRegularBooking = () => {
    navigate("/booking/regular");
  };

  return (
    <Page>
      <Navbar title="Book Ambulance" />
      
      <Block className="mt-4 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">JibonRoute</h1>
          <p className="text-gray-600">Emergency Medical Services in Dhaka</p>
        </div>

        {/* Emergency SOS Button */}
        <div className="space-y-3">
          <Button
            large
            className="w-full bg-red-600 text-white py-8 rounded-2xl shadow-lg active:shadow-xl"
            onClick={handleEmergencySOS}
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

        {/* Regular Booking Button */}
        <div className="pt-8 border-t space-y-3">
          <Button
            large
            className="w-full bg-life-green text-white py-6 rounded-xl"
            onClick={handleRegularBooking}
          >
            <div className="flex items-center justify-center gap-3">
              <Calendar className="w-6 h-6" />
              <span className="text-xl font-semibold">Book Ambulance</span>
            </div>
          </Button>
          <p className="text-center text-sm text-gray-600">
            Schedule pickup with detailed information
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-3 pt-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-life-green">5-10</div>
            <div className="text-xs text-gray-600">Min Response</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-life-green">24/7</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-life-green">50+</div>
            <div className="text-xs text-gray-600">Ambulances</div>
          </div>
        </div>
      </Block>
    </Page>
  );
};

export default BookingHomePage;
