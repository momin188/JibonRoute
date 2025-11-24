import { useState } from "react";
import { Page, Navbar, Block, Button, Card, List, ListItem, Dialog, Toast } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { MapPin, Building2, Truck, CreditCard, Edit, CheckCircle } from "lucide-react";

const BookingSummaryPage = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const bookingDetails = {
    pickup: "House 12, Road 5, Dhanmondi, Dhaka",
    destination: "Square Hospitals Ltd.",
    destinationAddress: "18/F Bir Uttam Qazi Nuruzzaman Sarak, Dhaka 1205",
    ambulanceType: "AC Ambulance",
    ambulancePrice: "৳2500",
    paymentMethod: "Cash",
    estimatedTime: "8-12 minutes",
    estimatedFare: "৳1700 - ৳2000",
    patientCondition: {
      consciousness: "Fully conscious",
      breathing: "5/10",
      pain: "7/10"
    }
  };

  const handleConfirm = () => {
    setShowDialog(false);
    setShowToast(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <Page>
      <Navbar 
        title="Booking Summary" 
        left={<button onClick={() => navigate(-1)}>Back</button>}
      />
      
      <Block className="mt-4 pb-24 space-y-4">
        <div className="text-center mb-6">
          <CheckCircle className="w-16 h-16 text-life-green mx-auto mb-3" />
          <h2 className="text-2xl font-bold mb-2">Review Your Booking</h2>
          <p className="text-gray-600">Please verify all details before confirming</p>
        </div>

        {/* Pickup Location */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              <MapPin className="w-5 h-5 text-life-green mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Pickup Location</h3>
                <p className="text-sm text-gray-600">{bookingDetails.pickup}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate("/booking/regular")}
              className="text-life-green"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </Card>

        {/* Destination */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              <Building2 className="w-5 h-5 text-life-green mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Destination</h3>
                <p className="text-sm font-medium">{bookingDetails.destination}</p>
                <p className="text-sm text-gray-600">{bookingDetails.destinationAddress}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate("/booking/regular")}
              className="text-life-green"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </Card>

        {/* Ambulance Type */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              <Truck className="w-5 h-5 text-life-green mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Ambulance Type</h3>
                <p className="text-sm text-gray-600">{bookingDetails.ambulanceType}</p>
                <p className="text-sm font-semibold text-life-green mt-1">
                  {bookingDetails.ambulancePrice}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigate("/booking/regular")}
              className="text-life-green"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </Card>

        {/* Patient Condition */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold mb-3">Patient Condition</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Consciousness:</span>
                  <span className="font-medium">{bookingDetails.patientCondition.consciousness}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Breathing Difficulty:</span>
                  <span className="font-medium">{bookingDetails.patientCondition.breathing}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pain Level:</span>
                  <span className="font-medium">{bookingDetails.patientCondition.pain}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => navigate("/booking/regular")}
              className="text-life-green"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-start gap-3 flex-1">
              <CreditCard className="w-5 h-5 text-life-green mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold mb-1">Payment Method</h3>
                <p className="text-sm text-gray-600">{bookingDetails.paymentMethod}</p>
              </div>
            </div>
            <button 
              onClick={() => navigate("/booking/regular")}
              className="text-life-green"
            >
              <Edit className="w-5 h-5" />
            </button>
          </div>
        </Card>

        {/* Fare Estimate */}
        <Card className="p-4 bg-life-green/5">
          <h3 className="font-semibold mb-3">Fare & Time Estimate</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Fare</span>
              <span className="font-bold text-life-green text-lg">{bookingDetails.estimatedFare}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estimated Arrival</span>
              <span className="font-semibold">{bookingDetails.estimatedTime}</span>
            </div>
          </div>
        </Card>

        <div className="text-center text-sm text-gray-600 py-4">
          <p>By confirming, you agree to our terms and conditions</p>
        </div>
      </Block>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        <Button
          large
          className="w-full bg-life-green"
          onClick={() => setShowDialog(true)}
        >
          Confirm & Book Ambulance
        </Button>
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        opened={showDialog}
        onBackdropClick={() => setShowDialog(false)}
        title="Confirm Booking"
        content="Are you sure you want to book this ambulance? This is a demo - no actual ambulance will be dispatched."
        buttons={
          <>
            <Button onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button strong onClick={handleConfirm}>Confirm</Button>
          </>
        }
      />

      {/* Success Toast */}
      <Toast
        position="center"
        opened={showToast}
        onClose={() => setShowToast(false)}
      >
        <div className="text-center py-2">
          <CheckCircle className="w-12 h-12 text-life-green mx-auto mb-2" />
          <div className="font-bold">Booking Confirmed!</div>
          <div className="text-sm text-gray-600">Demo completed successfully</div>
        </div>
      </Toast>
    </Page>
  );
};

export default BookingSummaryPage;
