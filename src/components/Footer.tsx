import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerSections = [
    {
      title: "Services",
      links: [
        "Emergency Ambulance",
        "ICU Transport",
        "Basic Ambulance",
        "AC Ambulance",
        "Paramedic Services",
        "Hospital Coordination"
      ]
    },
    {
      title: "Quick Links",
      links: [
        "Book Ambulance",
        "Track Ambulance", 
        "Find Hospitals",
        "Emergency Contacts",
        "Service Areas",
        "Pricing"
      ]
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact Us",
        "Report Issue",
        "Feedback",
        "Terms of Service",
        "Privacy Policy"
      ]
    },
    {
      title: "Company",
      links: [
        "About JibonRoute",
        "Our Mission",
        "Careers",
        "Press",
        "Blog",
        "Partners"
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        
        {/* Emergency Banner */}
        <div className="py-6 border-b border-primary-foreground/20">
          <div className="bg-emergency-glow/20 border border-emergency-glow/30 rounded-lg p-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center md:text-left">
                <div className="w-12 h-12 bg-emergency-glow/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6 text-emergency-glow" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-primary-foreground">24/7 Emergency Hotline</h3>
                  <p className="text-sm text-primary-foreground/80">Always available when you need us most</p>
                </div>
              </div>
              <Button variant="emergency" size="lg" className="gap-2 shadow-lg">
                <Phone className="w-5 h-5" />
                Call 999 Now
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid lg:grid-cols-6 gap-8">
            
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-life-green to-secondary rounded-lg flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">JibonRoute</h2>
                  <p className="text-sm text-primary-foreground/80">Life's Route</p>
                </div>
              </div>
              
              <p className="text-primary-foreground/80 leading-relaxed">
                Revolutionizing emergency medical services in Dhaka with AI-powered routing, 
                real-time tracking, and seamless hospital coordination. Your trusted partner 
                in medical emergencies.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-life-green" />
                  <span>Emergency: 999 | Support: +880-1700-000000</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="w-4 h-4 text-life-green" />
                  <span>emergency@jibonroute.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-life-green" />
                  <span>House 123, Road 45, Dhanmondi, Dhaka 1205</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-primary-foreground/10 hover:bg-life-green/20 rounded-lg flex items-center justify-center transition-colors"
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold text-primary-foreground">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a 
                        href="#" 
                        className="text-sm text-primary-foreground/80 hover:text-life-green transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/80">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>&copy; 2024 JibonRoute. All rights reserved.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-life-green transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-life-green transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-life-green transition-colors">Cookie Policy</a>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-xs">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-emergency-glow fill-current" />
              <span>for saving lives in Dhaka</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;