import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { KonstaProvider, App as KonstaApp } from "konsta/react";
import { useEffect } from "react";
import useAppStore, { $user } from "./store/useAppStore";

// Pages
import NewHomePage from "./pages/NewHomePage";
import NotFound from "./pages/NotFound";

// Onboarding
import OnboardingPage from "./pages/onboarding/OnboardingPage";

// Auth pages
import RegisterPage from "./pages/auth/RegisterPage";
import NewLoginPage from "./pages/auth/NewLoginPage";
import OTPVerificationPage from "./pages/auth/OTPVerificationPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import ProfileSetupPage from "./pages/auth/ProfileSetupPage";
import MedicalHistoryPage from "./pages/auth/MedicalHistoryPage";
import EmergencyContactsSetupPage from "./pages/auth/EmergencyContactsSetupPage";

// Profile pages
import ProfilePage from "./pages/profile/ProfilePage";
import EditProfilePage from "./pages/profile/EditProfilePage";
import MedicalHistoryViewPage from "./pages/profile/MedicalHistoryViewPage";
import FamilyProfilesPage from "./pages/profile/FamilyProfilesPage";
import EmergencyContactsPage from "./pages/profile/EmergencyContactsPage";
import DocumentsPage from "./pages/profile/DocumentsPage";

// Booking pages
import BookingHomePage from "./pages/booking/BookingHomePage";
import RegularBookingPage from "./pages/booking/RegularBookingPage";
import BookingSummaryPage from "./pages/booking/BookingSummaryPage";
import { useStore } from "@nanostores/react";

const queryClient = new QueryClient();

const MyApp = () => (
  <QueryClientProvider client={queryClient}>
    <KonstaApp theme="ios">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </KonstaApp>
  </QueryClientProvider>
);

export default MyApp;

function Router() {
  const { hasSeenOnboarding, isAuthenticated } = useStore($user);

  useEffect(() => {
    // Check localStorage for onboarding status
    const seen = localStorage.getItem("hasSeenOnboarding");
    if (seen === "true" && !hasSeenOnboarding) {
      $user.set({
        ...$user.get(),
        hasSeenOnboarding: true,
      });
    }
  }, [hasSeenOnboarding]);

  return (
    <Routes>
      {/* Onboarding Route */}
      <Route path="/onboarding" element={<OnboardingPage />} />

      {/* Home Route - redirect to onboarding if not seen */}
      <Route
        path="/"
        element={
          !hasSeenOnboarding ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <NewHomePage />
          )
        }
      />

      {/* Auth Routes */}
      <Route path="/auth">
        <Route path="login" element={<NewLoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-otp" element={<OTPVerificationPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="profile-setup" element={<ProfileSetupPage />} />
        <Route path="medical-history" element={<MedicalHistoryPage />} />
        <Route
          path="emergency-contacts"
          element={<EmergencyContactsSetupPage />}
        />
        <Route path="*" element={<Navigate to="/auth/register" replace />} />
      </Route>

      {/* Profile Routes */}
      <Route path="/profile">
        <Route index element={<ProfilePage />} />
        <Route path="edit" element={<EditProfilePage />} />
        <Route path="medical-history" element={<MedicalHistoryViewPage />} />
        <Route path="family" element={<FamilyProfilesPage />} />
        <Route path="emergency-contacts" element={<EmergencyContactsPage />} />
        <Route path="documents" element={<DocumentsPage />} />
      </Route>

      {/* Booking Routes */}
      <Route path="/booking">
        <Route index element={<BookingHomePage />} />
        <Route path="regular" element={<RegularBookingPage />} />
        <Route path="summary" element={<BookingSummaryPage />} />
      </Route>

      {/* Placeholder routes for features mentioned in homepage */}
      <Route
        path="/hospitals"
        element={
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">Hospital Directory</h1>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        }
      />
      <Route
        path="/ai-doctor"
        element={
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">AI Doctor Assistant</h1>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        }
      />
      <Route
        path="/tracking"
        element={
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">Live Tracking</h1>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        }
      />
      <Route
        path="/about"
        element={
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">About JibonRoute</h1>
            <p className="text-gray-600">
              Your trusted emergency medical service partner
            </p>
          </div>
        }
      />
      <Route
        path="/settings"
        element={
          <div className="p-4 text-center">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-gray-600">Coming soon...</p>
          </div>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
