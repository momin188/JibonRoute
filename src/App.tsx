import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { KonstaProvider } from "konsta/react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import AuthMethodPage from "./pages/auth/AuthMethodPage";
import PhoneRegistrationPage from "./pages/auth/PhoneRegistrationPage";
import EmailRegistrationPage from "./pages/auth/EmailRegistrationPage";
import ProfileCreationPage from "./pages/auth/ProfileCreationPage";
import MedicalHistoryPage from "./pages/auth/MedicalHistoryPage";

// Profile pages
import ProfilePage from "./pages/profile/ProfilePage";
import FamilyProfilesPage from "./pages/profile/FamilyProfilesPage";
import EmergencyContactsPage from "./pages/profile/EmergencyContactsPage";
import DocumentsPage from "./pages/profile/DocumentsPage";

// Booking pages
import BookingHomePage from "./pages/booking/BookingHomePage";
import RegularBookingPage from "./pages/booking/RegularBookingPage";
import BookingSummaryPage from "./pages/booking/BookingSummaryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <KonstaProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Auth Routes */}
            <Route path="/auth" element={<AuthMethodPage />} />
            <Route path="/auth/phone" element={<PhoneRegistrationPage />} />
            <Route path="/auth/email" element={<EmailRegistrationPage />} />
            <Route path="/auth/profile-creation" element={<ProfileCreationPage />} />
            <Route path="/auth/medical-history" element={<MedicalHistoryPage />} />
            
            {/* Profile Routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/family" element={<FamilyProfilesPage />} />
            <Route path="/profile/emergency-contacts" element={<EmergencyContactsPage />} />
            <Route path="/profile/documents" element={<DocumentsPage />} />
            
            {/* Booking Routes */}
            <Route path="/booking" element={<BookingHomePage />} />
            <Route path="/booking/regular" element={<RegularBookingPage />} />
            <Route path="/booking/summary" element={<BookingSummaryPage />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </KonstaProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
