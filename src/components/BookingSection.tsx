import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Search, 
  Navigation, 
  Clock, 
  User, 
  Heart, 
  Thermometer,
  Stethoscope,
  Shield,
  Car,
  Truck,
  Plane
} from "lucide-react";

const BookingSection = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedHospital, setSelectedHospital] = useState("");
  const [selectedAmbulance, setSelectedAmbulance] = useState("");

  const hospitals = [
    { id: "1", name: "Dhaka Medical College Hospital", type: "Government", distance: "2.5 km", rating: 4.2 },
    { id: "2", name: "Square Hospitals Ltd.", type: "Private", distance: "3.1 km", rating: 4.8 },
    { id: "3", name: "United Hospital Limited", type: "Private", distance: "4.2 km", rating: 4.7 },
    { id: "4", name: "Bangabandhu Sheikh Mujib Medical University", type: "Government", distance: "5.8 km", rating: 4.3 },
    { id: "5", name: "Apollo Hospitals Dhaka", type: "Private", distance: "6.5 km", rating: 4.6 },
    { id: "6", name: "National Institute of Cardiovascular Diseases", type: "Government", distance: "7.2 km", rating: 4.4 },
  ];

  const ambulanceTypes = [
    {
      id: "basic",
      name: "Basic Ambulance",
      description: "Essential emergency transport",
      price: "৳800-1200",
      features: ["Basic life support", "Oxygen supply", "Stretcher"],
      icon: Car,
      popular: false
    },
    {
      id: "ac",
      name: "AC Ambulance",
      description: "Climate-controlled transport",
      price: "৳1200-1800",
      features: ["Air conditioning", "Basic life support", "Oxygen supply", "Stretcher"],
      icon: Car,
      popular: true
    },
    {
      id: "paramedic",
      name: "Paramedic Ambulance",
      description: "Advanced medical support",
      price: "৳1800-2500",
      features: ["Trained paramedic", "Advanced equipment", "Emergency medications", "AC"],
      icon: Stethoscope,
      popular: false
    },
    {
      id: "icu",
      name: "ICU Ambulance",
      description: "Critical care transport",
      price: "৳2500-3500",
      features: ["ICU equipment", "Ventilator", "Cardiac monitor", "Doctor available", "Full life support"],
      icon: Heart,
      popular: false
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Book Your <span className="text-primary">Emergency</span> Ambulance
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick and easy booking process with transparent pricing and real-time tracking
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="w-6 h-6 text-life-green" />
                Emergency Ambulance Booking
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              
              {/* Location Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground">Pickup Location</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      placeholder="Enter your current location"
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="h-12"
                    />
                  </div>
                  <Button variant="outline" className="h-12 gap-2">
                    <Navigation className="w-5 h-5" />
                    Use Current Location
                  </Button>
                </div>
                <Button variant="secondary" className="w-full h-12 gap-2">
                  <Search className="w-5 h-5" />
                  Select from Map
                </Button>
              </div>

              {/* Hospital Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground">Destination Hospital</Label>
                <div className="grid gap-3">
                  {hospitals.map((hospital) => (
                    <Card 
                      key={hospital.id}
                      className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                        selectedHospital === hospital.id 
                          ? 'ring-2 ring-life-green bg-life-green/5' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => setSelectedHospital(hospital.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <h4 className="font-semibold text-foreground">{hospital.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <Badge variant={hospital.type === 'Private' ? 'default' : 'secondary'}>
                                {hospital.type}
                              </Badge>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {hospital.distance}
                              </span>
                              <span className="flex items-center gap-1">
                                ⭐ {hospital.rating}
                              </span>
                            </div>
                          </div>
                          <Clock className="w-5 h-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Ambulance Type Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold text-foreground">Select Ambulance Type</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  {ambulanceTypes.map((ambulance) => {
                    const IconComponent = ambulance.icon;
                    return (
                      <Card 
                        key={ambulance.id}
                        className={`cursor-pointer transition-all duration-200 hover:shadow-md relative ${
                          selectedAmbulance === ambulance.id 
                            ? 'ring-2 ring-life-green bg-life-green/5' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setSelectedAmbulance(ambulance.id)}
                      >
                        {ambulance.popular && (
                          <Badge className="absolute -top-2 left-4 bg-life-green text-white">
                            Most Popular
                          </Badge>
                        )}
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                  <IconComponent className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-foreground">{ambulance.name}</h4>
                                  <p className="text-sm text-muted-foreground">{ambulance.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-lg font-bold text-life-green">{ambulance.price}</div>
                                <div className="text-xs text-muted-foreground">Estimated</div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              {ambulance.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Shield className="w-3 h-3 text-life-green" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Book Button */}
              <div className="pt-4">
                <Button 
                  variant="emergency" 
                  size="lg" 
                  className="w-full text-lg py-6"
                  disabled={!selectedLocation || !selectedHospital || !selectedAmbulance}
                >
                  Book Emergency Ambulance Now
                </Button>
                <p className="text-sm text-muted-foreground text-center mt-2">
                  Average response time: 5-10 minutes • 24/7 availability
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;