import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, Shield, Star } from "lucide-react";
import heroImage from "@/assets/hero-ambulance.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Elements */}
      {/* <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(68,176,61,0.05)_50%,transparent_75%)] pointer-events-none"></div> */}

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-life-green/10 text-life-green px-4 py-2 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-life-green rounded-full animate-pulse"></div>
                Available 24/7 in Dhaka
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Emergency <span className="text-primary">Ambulance</span> at
                Your <span className="text-life-green">Fingertips</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                JibonRoute revolutionizes emergency medical services in Dhaka
                with AI-powered routing, real-time tracking, and instant
                hospital coordination. Your life's route to safety.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-life-green">5-10</div>
                <div className="text-sm text-muted-foreground">Minutes Avg</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emergency-glow">
                  99%
                </div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="emergency"
                size="lg"
                className="text-lg px-8"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Book Emergency Ambulance
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8"
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="w-5 h-5 text-life-green" />
                <span>GPS Live Tracking</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-5 h-5 text-life-green" />
                <span>Real-time ETA</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Shield className="w-5 h-5 text-life-green" />
                <span>Verified Medical Staff</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Star className="w-5 h-5 text-life-green" />
                <span>Premium Equipment</span>
              </div>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="relative">
            <div className="relative">
              <img
                src={heroImage}
                alt="Emergency Ambulance Service"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent rounded-2xl"></div>
            </div>

            {/* Floating Stats Card */}
            <Card className="absolute -bottom-6 -left-6 p-4 bg-background/95 backdrop-blur-sm shadow-xl border-life-green/20">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-life-green/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-life-green" />
                </div>
                <div>
                  <div className="text-lg font-bold text-life-green">5 min</div>
                  <div className="text-sm text-muted-foreground">
                    Avg Response
                  </div>
                </div>
              </div>
            </Card>

            {/* Emergency Pulse Effect */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-emergency-glow/20 rounded-full animate-ping"></div>
            <div className="absolute -top-2 -right-2 w-12 h-12 bg-emergency-glow/40 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
