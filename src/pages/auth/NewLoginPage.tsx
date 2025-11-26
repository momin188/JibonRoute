import { useState } from "react";
import {
  Page,
  Navbar,
  Block,
  Button,
  List,
  ListInput,
  Toast,
  Link,
} from "konsta/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Eye, EyeOff, Chrome, Facebook } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import useAppStore from "@/store/useAppStore";

const NewLoginPage = () => {
  const navigate = useNavigate();
  const login = useAppStore((state) => state.login);
  const [formData, setFormData] = useState({
    identifier: "", // phone or email
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleLogin = async () => {
    setError("");

    if (!formData.identifier) {
      setError("Phone number or email is required");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }

    setLoading(true);

    try {
      const result = await mockAuthService.login(formData);

      if (result.success && result.user) {
        login(result.user);

        // If profile is not complete, redirect to profile setup
        if (!result.user.isProfileComplete) {
          navigate("/auth/profile-setup", {
            state: { userId: result.user.id },
          });
        } else {
          navigate("/");
        }
      } else {
        setError(result.error || "Login failed");
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
        login(result.user);

        if (!result.user.isProfileComplete) {
          navigate("/auth/profile-setup", {
            state: { userId: result.user.id },
          });
        } else {
          navigate("/");
        }
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
      <Navbar title="Welcome Back" />

      <Block className="mt-4 pb-24">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-life-green mb-2">
            JibonRoute
          </h1>
          <p className="text-gray-600">Login to access emergency services</p>
        </div>

        {/* Form */}
        <List strongIos outlineIos className="mb-4">
          <ListInput
            label="Phone or Email"
            type="text"
            placeholder="Enter phone number or email"
            value={formData.identifier}
            onChange={(e) =>
              setFormData({ ...formData, identifier: e.target.value })
            }
          />

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
        </List>

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <RouterLink
            to="/auth/forgot-password"
            className="text-life-green text-sm font-medium"
          >
            Forgot Password?
          </RouterLink>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button
          large
          className="w-full bg-life-green mb-4"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
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

        {/* Social Login */}
        <div className="space-y-3 mb-6">
          <Button
            large
            outline
            className="w-full"
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
          >
            <Chrome className="w-5 h-5 mr-2" />
            Continue with Google
          </Button>
          <Button
            large
            outline
            className="w-full"
            onClick={() => handleSocialLogin("facebook")}
            disabled={loading}
          >
            <Facebook className="w-5 h-5 mr-2" />
            Continue with Facebook
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Don't have an account? </span>
          <RouterLink
            to="/auth/register"
            className="text-life-green font-semibold"
          >
            Create Account
          </RouterLink>
        </div>
      </Block>

      <Toast opened={toast.show}>
        <div className="text-center">{toast.message}</div>
      </Toast>
    </Page>
  );
};

export default NewLoginPage;
