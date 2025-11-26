import { useState } from "react";
import { Page, Block, Button, Link } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Heart, MapPin, Shield, Clock } from "lucide-react";

const slides = [
  {
    icon: Heart,
    title: "Welcome to JibonRoute",
    description:
      "Your trusted emergency medical service partner in Dhaka. Fast, reliable ambulance service at your fingertips.",
    color: "text-red-500",
    bgColor: "bg-red-50",
  },
  {
    icon: Clock,
    title: "Quick Response Time",
    description:
      "Get ambulance service in 5-10 minutes. Our advanced routing system ensures the fastest arrival time.",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description:
      "Track your ambulance in real-time. Know exactly when help will arrive with live GPS tracking.",
    color: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    icon: Shield,
    title: "Verified Professionals",
    description:
      "All our drivers and paramedics are verified and trained. Your safety is our priority.",
    color: "text-purple-500",
    bgColor: "bg-purple-50",
  },
];

const OnboardingPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      localStorage.setItem("hasSeenOnboarding", "true");
      navigate("/auth/register");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("hasSeenOnboarding", "true");
    navigate("/auth/register");
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <Page>
      <Block className="min-h-screen flex flex-col justify-between py-8 px-4">
        {/* Skip Button */}
        {currentSlide < slides.length - 1 && (
          <div className="flex justify-end">
            <Link onClick={handleSkip}>Skip</Link>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className={`${slide.bgColor} p-12 rounded-full mb-8`}>
            <Icon className={`w-24 h-24 ${slide.color}`} />
          </div>

          <h1 className="text-3xl font-bold mb-4 px-4">{slide.title}</h1>
          <p className="text-gray-600 text-lg px-6 leading-relaxed">
            {slide.description}
          </p>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-life-green" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Next/Get Started Button */}
        <Button
          large
          rounded
          //   className="w-full bg-life-green text-white"
          onClick={handleNext}
        >
          <div className="flex items-center justify-center gap-2">
            <span className="text-lg">
              {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
            </span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </Button>
      </Block>
    </Page>
  );
};

export default OnboardingPage;
