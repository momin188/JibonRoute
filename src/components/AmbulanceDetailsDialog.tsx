import { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Shield, 
  CreditCard, 
  Phone, 
  MapPin, 
  Clock,
  CheckCircle,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import basicInteriorImg from "@/assets/basic-ambulance-interior.jpg";
import acInteriorImg from "@/assets/ac-ambulance-interior.jpg";
import paramedicInteriorImg from "@/assets/paramedic-ambulance-interior.jpg";
import icuInteriorImg from "@/assets/icu-ambulance-interior.jpg";

interface AmbulanceType {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  popular: boolean;
}

interface AmbulanceDetailsDialogProps {
  ambulance: AmbulanceType | null;
  isOpen: boolean;
  onClose: () => void;
}

const AmbulanceDetailsDialog = ({ ambulance, isOpen, onClose }: AmbulanceDetailsDialogProps) => {
  const [bookingStep, setBookingStep] = useState<'details' | 'booking' | 'payment'>('details');
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const { toast } = useToast();

  if (!ambulance) return null;

  const getInteriorImage = (id: string) => {
    switch (id) {
      case 'basic': return basicInteriorImg;
      case 'ac': return acInteriorImg;
      case 'paramedic': return paramedicInteriorImg;
      case 'icu': return icuInteriorImg;
      default: return basicInteriorImg;
    }
  };

  const handleBookingSubmit = () => {
    if (!patientName || !patientPhone || !pickupAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    setBookingStep('payment');
  };

  const handleBkashPayment = () => {
    // Simulate bKash payment process
    toast({
      title: "Payment Initiated",
      description: "Redirecting to bKash payment gateway...",
    });
    
    // Simulate payment success after 2 seconds
    setTimeout(() => {
      toast({
        title: "Booking Confirmed!",
        description: "Your ambulance has been booked successfully. ETA: 8-12 minutes",
      });
      onClose();
      setBookingStep('details');
    }, 2000);
  };

  const resetDialog = () => {
    setBookingStep('details');
    setPatientName("");
    setPatientPhone("");
    setPickupAddress("");
    setEmergencyContact("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetDialog}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {bookingStep !== 'details' && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setBookingStep(bookingStep === 'payment' ? 'booking' : 'details')}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            {ambulance.name}
            {ambulance.popular && (
              <Badge className="bg-life-green text-white">Most Popular</Badge>
            )}
          </DialogTitle>
        </DialogHeader>

        {bookingStep === 'details' && (
          <div className="space-y-6">
            {/* Ambulance Images */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Exterior View</h4>
                <img 
                  src={ambulance.image} 
                  alt={`${ambulance.name} exterior`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Interior View</h4>
                <img 
                  src={getInteriorImage(ambulance.id)} 
                  alt={`${ambulance.name} interior`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">Features & Equipment</h4>
              <div className="grid md:grid-cols-2 gap-2">
                {ambulance.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-life-green" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <Card className="bg-life-green/5 border-life-green/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">Estimated Cost</h4>
                    <p className="text-sm text-muted-foreground">{ambulance.description}</p>
                  </div>
                  <div className="text-2xl font-bold text-life-green">{ambulance.price}</div>
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  • 24/7 availability • Average response time: 5-10 minutes
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={() => setBookingStep('booking')} 
              className="w-full"
              variant="emergency"
              size="lg"
            >
              Book This Ambulance
            </Button>
          </div>
        )}

        {bookingStep === 'booking' && (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="patientName">Patient Name *</Label>
                  <Input
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient's full name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="patientPhone">Patient Phone *</Label>
                  <Input
                    id="patientPhone"
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="+880 1234 567890"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="pickupAddress">Pickup Address *</Label>
                <Input
                  id="pickupAddress"
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter complete pickup address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="Emergency contact number (optional)"
                />
              </div>
            </div>

            <Separator />

            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold">Selected Service:</span>
                <span>{ambulance.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold">Estimated Cost:</span>
                <span className="text-lg font-bold text-life-green">{ambulance.price}</span>
              </div>
            </div>

            <Button 
              onClick={handleBookingSubmit}
              className="w-full"
              variant="emergency"
              size="lg"
            >
              Proceed to Payment
            </Button>
          </div>
        )}

        {bookingStep === 'payment' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <CheckCircle className="w-16 h-16 text-life-green mx-auto" />
              <h3 className="text-xl font-semibold">Complete Your Payment</h3>
              <p className="text-muted-foreground">Pay securely using bKash</p>
            </div>

            <Card className="bg-muted/50">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span>Service:</span>
                  <span className="font-semibold">{ambulance.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Patient:</span>
                  <span className="font-semibold">{patientName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Phone:</span>
                  <span className="font-semibold">{patientPhone}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Pickup:</span>
                  <span className="font-semibold text-sm">{pickupAddress}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-lg">
                  <span className="font-bold">Total Amount:</span>
                  <span className="font-bold text-life-green">{ambulance.price}</span>
                </div>
              </CardContent>
            </Card>

            <Button 
              onClick={handleBkashPayment}
              className="w-full bg-[#E2136E] hover:bg-[#C71157] text-white"
              size="lg"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Pay with bKash
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>• Secure payment gateway</p>
              <p>• Ambulance will be dispatched immediately after payment</p>
              <p>• You will receive SMS updates about arrival time</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AmbulanceDetailsDialog;