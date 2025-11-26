import { useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListInput,
  Toast,
  Segmented,
  SegmentedButton,
  Link,
  ListButton,
} from "konsta/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Phone, Mail, Eye, EyeOff } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import { $user } from "@/store/useAppStore";
import Facebook from "@/assets/icons/facebook.svg?react";
import Google from "@/assets/icons/google.svg?react";

const NewRegisterPage = () => {
  const navigate = useNavigate();
  const [registrationType, setRegistrationType] = useState<"phone" | "email">(
    "phone"
  );
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleRegister = async () => {
    setError("");

    // Validation
    if (registrationType === "phone" && !formData.phone) {
      setError("Phone number is required");
      return;
    }
    if (registrationType === "email" && !formData.email) {
      setError("Email is required");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await mockAuthService.register({
        phone: registrationType === "phone" ? formData.phone : undefined,
        email: registrationType === "email" ? formData.email : undefined,
        password: formData.password,
        registrationType,
      });

      if (result.success) {
        // If phone registration, go to OTP verification
        if (registrationType === "phone") {
          navigate("/auth/verify-otp", { state: { phone: formData.phone } });
        } else {
          // For email, go to profile setup
          navigate("/auth/profile-setup", { state: { userId: result.userId } });
        }
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "facebook") => {
    setLoading(true);
    try {
      const result = await mockAuthService.socialLogin(provider);
      if (result.success && result.user) {
        $user.set({
          ...$user.get(),
          isAuthenticated: true,
          user: result.user,
        });
        navigate("/auth/profile-setup", { state: { userId: result.user.id } });
      } else {
        setToast({
          show: true,
          message: result.error || "Social login failed",
        });
      }
    } catch (err) {
      setToast({ show: true, message: "An error occurred" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page>
      <Block className="mt-4 pb-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-life-green mb-2">
            JibonRoute
          </h1>
          <p className="text-gray-600">Register to access emergency services</p>
        </div>

        {/* Registration Type Tabs */}
        <Segmented strong className="mb-6">
          <SegmentedButton
            active={registrationType === "phone"}
            onClick={() => setRegistrationType("phone")}
          >
            <Phone className="w-4 h-4 inline mr-2" />
            Phone
          </SegmentedButton>
          <SegmentedButton
            active={registrationType === "email"}
            onClick={() => setRegistrationType("email")}
          >
            <Mail className="w-4 h-4 inline mr-2" />
            Email
          </SegmentedButton>
        </Segmented>

        {/* Form */}
        <List strongIos outlineIos inset nested className="mb-4">
          {registrationType === "phone" ? (
            <ListInput
              label="Phone Number"
              type="tel"
              placeholder="+880 1XXX-XXXXXX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          ) : (
            <ListInput
              label="Email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          )}

          <ListInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          >
            <Link
              slot="inner-end"
              onClick={() => setShowPassword(!showPassword)}
              iconOnly
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </Link>
          </ListInput>

          <ListInput
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </List>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button large rounded onClick={handleRegister} disabled={loading}>
          {loading ? "Creating Account..." : "Create Account"}
        </Button>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">
              Or continue with
            </span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <Button
            large
            outline
            rounded
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
          >
            <Google className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          <Button
            large
            outline
            rounded
            className="w-full"
            onClick={() => handleSocialLogin("facebook")}
            disabled={loading}
          >
            <Facebook className="w-5 h-5 mr-2" fill="#0866FF" />
            Continue with Facebook
          </Button>
        </div>

        {/* Login Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <RouterLink
            to="/auth/login"
            className="text-life-green font-semibold"
          >
            Login
          </RouterLink>
        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 text-center mt-6">
          By creating an account, you agree to our{" "}
          <span className="text-life-green">Terms of Service</span> and{" "}
          <span className="text-life-green">Privacy Policy</span>
        </p>
      </Block>

      <Toast opened={toast.show}>
        <div className="text-center">{toast.message}</div>
      </Toast>
    </Page>
  );
};

export default NewRegisterPage;
