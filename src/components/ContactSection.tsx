import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Heart,
  Ambulance,
  Hospital,
  Users
} from "lucide-react";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      details: ["999 (24/7)", "+880-1700-000000"],
      color: "text-emergency-glow"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["emergency@jibonroute.com", "support@jibonroute.com"],
      color: "text-primary"
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: ["House 123, Road 45", "Dhanmondi, Dhaka 1205"],
      color: "text-life-green"
    },
    {
      icon: Clock,
      title: "Support Hours",
      details: ["24/7 Emergency", "9 AM - 10 PM General"],
      color: "text-primary"
    }
  ];

  const quickActions = [
    {
      icon: Ambulance,
      title: "Book Emergency Ambulance",
      description: "Get immediate ambulance service",
      action: "Book Now",
      variant: "emergency" as const
    },
    {
      icon: Hospital,
      title: "Find Nearest Hospital",
      description: "Locate hospitals with availability",
      action: "Find Hospital",
      variant: "life" as const
    },
    {
      icon: Users,
      title: "Corporate Services",
      description: "Bulk booking for organizations",
      action: "Learn More",
      variant: "hero" as const
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help 24/7. Reach out for emergencies, support, or any questions about our services
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Heart className="w-6 h-6 text-life-green" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${info.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">{info.title}</h4>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="space-y-4">
              {quickActions.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <IconComponent className="w-5 h-5 text-primary" />
                        <h4 className="font-semibold text-foreground">{action.title}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {action.description}
                      </p>
                      <Button variant={action.variant} size="sm" className="w-full">
                        {action.action}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-background/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="Enter your full name" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+880 1XXX-XXXXXX" className="h-12" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" className="h-12" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help?" className="h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your inquiry or feedback in detail..."
                    className="min-h-32 resize-none"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <input type="checkbox" id="emergency" className="rounded border-border" />
                    <label htmlFor="emergency">This is an emergency situation</label>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button variant="hero" size="lg" className="flex-1">
                      Send Message
                    </Button>
                    <Button variant="outline" size="lg" className="flex-1">
                      Call Instead
                    </Button>
                  </div>
                </div>

                <div className="bg-life-green/10 border border-life-green/20 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-life-green mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-life-green mb-1">For Immediate Emergency</h4>
                      <p className="text-sm text-muted-foreground">
                        Call our 24/7 emergency hotline: <strong>999</strong> or use the emergency booking button above
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-primary/10 via-life-green/10 to-primary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ready to Experience JibonRoute?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of Dhaka residents who trust JibonRoute for their emergency medical needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="emergency" size="lg" className="gap-2">
                <Ambulance className="w-5 h-5" />
                Book Emergency Ambulance
              </Button>
              <Button variant="outline" size="lg">
                Download Mobile App
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;