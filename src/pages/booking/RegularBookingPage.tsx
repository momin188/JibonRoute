import { useState } from "react";
import { Page, Navbar, Block, List, ListInput, Button, Card, Segmented, SegmentedButton } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { MapPin, Navigation, Search, Building2, Crosshair } from "lucide-react";
import AmbulanceTypeCard from "@/components/AmbulanceTypeCard";
import QuestionnaireSection from "@/components/QuestionnaireSection";
import basicAmbulanceImg from "@/assets/basic-ambulance.jpg";
import acAmbulanceImg from "@/assets/ac-ambulance.jpg";
import paramedicAmbulanceImg from "@/assets/paramedic-ambulance.jpg";
import icuAmbulanceImg from "@/assets/icu-ambulance.jpg";

const RegularBookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  // Step 1: Location
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationType, setDestinationType] = useState<"hospital" | "nearest" | "custom">("hospital");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [customDestination, setCustomDestination] = useState("");

  // Step 2: Ambulance Type
  const [selectedAmbulance, setSelectedAmbulance] = useState("");

  // Step 3: Patient Condition
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string | number>>({});

  // Step 4: Payment
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const hospitals = [
    { id: "1", name: "Dhaka Medical College Hospital", distance: "2.5 km" },
    { id: "2", name: "Square Hospitals Ltd.", distance: "3.1 km" },
    { id: "3", name: "United Hospital Limited", distance: "4.2 km" },
  ];

  const ambulanceTypes = [
    {
      id: "basic",
      name: "Basic Ambulance",
      description: "Essential emergency transport",
      price: "৳1550",
      features: ["Basic life support", "Oxygen supply", "Stretcher"],
      image: basicAmbulanceImg,
    },
    {
      id: "ac",
      name: "AC Ambulance",
      description: "Climate-controlled transport",
      price: "৳2500",
      features: ["Air conditioning", "Basic life support", "Oxygen supply"],
      image: acAmbulanceImg,
      popular: true
    },
    {
      id: "paramedic",
      name: "Paramedic Ambulance",
      description: "Advanced medical support",
      price: "৳3500",
      features: ["Trained paramedic", "Advanced equipment", "Emergency medications"],
      image: paramedicAmbulanceImg,
    },
    {
      id: "icu",
      name: "ICU Ambulance",
      description: "Critical care transport",
      price: "৳6000",
      features: ["ICU equipment", "Ventilator", "Cardiac monitor"],
      image: icuAmbulanceImg,
    }
  ];

  const conditionQuestions = [
    {
      id: "consciousness",
      question: "Is the patient conscious?",
      type: "radio" as const,
      options: ["Fully conscious", "Drowsy", "Unconscious"]
    },
    {
      id: "breathing",
      question: "Breathing difficulty level",
      type: "slider" as const,
      min: 0,
      max: 10
    },
    {
      id: "pain",
      question: "Pain level (0-10)",
      type: "slider" as const,
      min: 0,
      max: 10
    }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigate(-1);
  };

  const handleConfirmBooking = () => {
    console.log("Booking confirmed:", {
      pickupLocation,
      destinationType,
      selectedHospital,
      customDestination,
      selectedAmbulance,
      questionAnswers,
      paymentMethod
    });
    navigate("/booking/summary");
  };

  const canProceed = () => {
    if (step === 1) {
      return pickupLocation && (
        (destinationType === "hospital" && selectedHospital) ||
        (destinationType === "custom" && customDestination) ||
        destinationType === "nearest"
      );
    }
    if (step === 2) return selectedAmbulance;
    if (step === 3) return true;
    if (step === 4) return paymentMethod;
    return false;
  };

  return (
    <Page>
      <Navbar 
        title={`Book Ambulance (${step}/4)`}
        left={<button onClick={handleBack}>Back</button>}
      />
      
      <Block className="mt-4 pb-24">
        {/* Progress indicator */}
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded ${
                s <= step ? "bg-life-green" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* Step 1: Location */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Pickup Location</h2>
              <List strongIos outlineIos>
                <ListInput
                  label="Pickup Address"
                  type="text"
                  placeholder="Enter pickup location"
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  clearButton
                />
              </List>
              <Button
                className="w-full mt-3"
                outline
                onClick={() => console.log("Use current location")}
              >
                <Navigation className="w-4 h-4 mr-2" />
                Use Current Location
              </Button>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Destination</h2>
              <Segmented className="mb-4">
                <SegmentedButton
                  active={destinationType === "hospital"}
                  onClick={() => setDestinationType("hospital")}
                >
                  Hospital
                </SegmentedButton>
                <SegmentedButton
                  active={destinationType === "nearest"}
                  onClick={() => setDestinationType("nearest")}
                >
                  Nearest
                </SegmentedButton>
                <SegmentedButton
                  active={destinationType === "custom"}
                  onClick={() => setDestinationType("custom")}
                >
                  Custom
                </SegmentedButton>
              </Segmented>

              {destinationType === "hospital" && (
                <div className="space-y-2">
                  {hospitals.map((hospital) => (
                    <Card
                      key={hospital.id}
                      className={`p-3 cursor-pointer ${
                        selectedHospital === hospital.id ? "ring-2 ring-life-green" : ""
                      }`}
                      onClick={() => setSelectedHospital(hospital.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-life-green" />
                          <div>
                            <div className="font-semibold">{hospital.name}</div>
                            <div className="text-sm text-gray-600">{hospital.distance}</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {destinationType === "nearest" && (
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <Crosshair className="w-8 h-8 text-life-green" />
                    <div>
                      <div className="font-semibold">Nearest Hospital</div>
                      <div className="text-sm text-gray-600">
                        We'll route to the closest appropriate hospital
                      </div>
                    </div>
                  </div>
                </Card>
              )}

              {destinationType === "custom" && (
                <List strongIos outlineIos>
                  <ListInput
                    label="Destination Address"
                    type="text"
                    placeholder="Enter destination"
                    value={customDestination}
                    onChange={(e) => setCustomDestination(e.target.value)}
                    clearButton
                  />
                </List>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Ambulance Type */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4">Select Ambulance Type</h2>
            <div className="grid gap-4">
              {ambulanceTypes.map((ambulance) => (
                <AmbulanceTypeCard
                  key={ambulance.id}
                  {...ambulance}
                  selected={selectedAmbulance === ambulance.id}
                  onClick={() => setSelectedAmbulance(ambulance.id)}
                  onInfoClick={() => console.log("Show details for", ambulance.name)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Patient Condition */}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-bold mb-2">Patient Condition</h2>
              <p className="text-sm text-gray-600 mb-4">
                Help us prepare the right medical support
              </p>
            </div>
            <QuestionnaireSection
              questions={conditionQuestions}
              answers={questionAnswers}
              onAnswerChange={(id, value) =>
                setQuestionAnswers({ ...questionAnswers, [id]: value })
              }
            />
          </div>
        )}

        {/* Step 4: Payment & Summary */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Payment Method</h2>
              <Segmented>
                <SegmentedButton
                  active={paymentMethod === "cash"}
                  onClick={() => setPaymentMethod("cash")}
                >
                  Cash
                </SegmentedButton>
                <SegmentedButton
                  active={paymentMethod === "mobile"}
                  onClick={() => setPaymentMethod("mobile")}
                >
                  Mobile Banking
                </SegmentedButton>
                <SegmentedButton
                  active={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                >
                  Card
                </SegmentedButton>
              </Segmented>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Fare Estimate</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Fare</span>
                  <span className="font-semibold">৳1200</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance (5 km)</span>
                  <span className="font-semibold">৳500</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Estimated Total</span>
                  <span className="font-bold text-life-green text-lg">৳1700 - ৳2000</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <span className="font-semibold">ETA:</span> 8-12 minutes
                </div>
              </div>
            </Card>
          </div>
        )}
      </Block>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
        {step < 4 ? (
          <Button
            large
            className="w-full"
            disabled={!canProceed()}
            onClick={handleNext}
          >
            Continue
          </Button>
        ) : (
          <Button
            large
            className="w-full bg-life-green"
            disabled={!canProceed()}
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </Button>
        )}
      </div>
    </Page>
  );
};

export default RegularBookingPage;
