import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BookingSection from "@/components/BookingSection";
import ReviewsSection from "@/components/ReviewsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div>
      <Header />
      <main className="pt-safe">
        <HeroSection />
        <BookingSection />
        <ReviewsSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
