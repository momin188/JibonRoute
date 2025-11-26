import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { KonstaProvider, App as KonstaApp } from "konsta/react";
import { App } from "@capacitor/app";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Auth pages
import AuthMethodPage from "./pages/auth/RegisterPage";
import PhoneRegistrationPage from "./pages/auth/PhoneRegistrationPage";
import EmailRegistrationPage from "./pages/auth/EmailRegistrationPage";
import ProfileCreationPage from "./pages/auth/ProfileCreationPage";
import MedicalHistoryPage from "./pages/auth/MedicalHistoryPage";
import RegisterPage from "./pages/auth/RegisterPage";

// Profile pages
import ProfilePage from "./pages/profile/ProfilePage";
import FamilyProfilesPage from "./pages/profile/FamilyProfilesPage";
import EmergencyContactsPage from "./pages/profile/EmergencyContactsPage";
import DocumentsPage from "./pages/profile/DocumentsPage";

// Booking pages
import BookingHomePage from "./pages/booking/BookingHomePage";
import RegularBookingPage from "./pages/booking/RegularBookingPage";
import BookingSummaryPage from "./pages/booking/BookingSummaryPage";
import LoginPage from "./pages/auth/LoginPage";
import { useEffect } from "react";

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
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const listener = App.addListener("backButton", (event) => {
  //     console.log("Back button", event);

  //     if (event.canGoBack) {
  //       navigate(-1);
  //     } else {
  //       App.exitApp();
  //     }
  //   });

  //   return () => {
  //     listener.then((l) => l.remove());
  //   };
  // }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />

      {/* Auth Routes */}
      <Route path="/auth">
        <Route index element={<Navigate to="/auth/register" replace />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        {/* <Route path="email" element={<EmailRegistrationPage />} />
              <Route
                path="profile-creation"
                element={<ProfileCreationPage />}
              />
              <Route path="medical-history" element={<MedicalHistoryPage />} /> */}
      </Route>

      {/* Profile Routes */}
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/profile/family" element={<FamilyProfilesPage />} />
      <Route
        path="/profile/emergency-contacts"
        element={<EmergencyContactsPage />}
      />
      <Route path="/profile/documents" element={<DocumentsPage />} />

      {/* Booking Routes */}
      <Route path="/booking" element={<BookingHomePage />} />
      <Route path="/booking/regular" element={<RegularBookingPage />} />
      <Route path="/booking/summary" element={<BookingSummaryPage />} />

      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
