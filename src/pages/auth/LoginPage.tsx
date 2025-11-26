import { useState } from "react";
import {
  Page,
  Block,
  Button,
  List,
  ListInput,
  BlockTitle,
  Link,
  Toast,
} from "konsta/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";
import { $user } from "@/store/useAppStore";
import Facebook from "@/assets/icons/facebook.svg?react";
import Google from "@/assets/icons/google.svg?react";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleLogin = async () => {
    setError("");

    if (!formData.identifier) {
      setError("Email or phone is required");
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
        $user.set({
          ...$user.get(),
          isAuthenticated: true,
          user: result.user,
        });

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
        $user.set({
          ...$user.get(),
          isAuthenticated: true,
          user: result.user,
        });

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
    <Page className="flex flex-col justify-center">
      <BlockTitle large component="h1" className="block text-center">
        Welcome back to JibonRoute
      </BlockTitle>
      <BlockTitle className="my-0 block text-center" component="p">
        Sign in to access emergency services
      </BlockTitle>

      <Block strong inset className="px-0">
        <List nested>
          <ListInput
            label="Email or Phone"
            type="text"
            placeholder="Your email or phone"
            value={formData.identifier}
            onChange={(e) =>
              setFormData({ ...formData, identifier: e.target.value })
            }
          />

          <ListInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            input={
              <>
                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="h-10 block text-base appearance-none w-full focus:outline-none bg-transparent placeholder-black/30 dark:placeholder-white/30"
                  type={showPassword ? "text" : "password"}
                  placeholder="Your password"
                />
                <Link
                  slot="inner-end"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                  iconOnly
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </Link>
              </>
            }
            error={
              error && (
                <Block nested className="mt-2 mb-0">
                  <p className="text-red-600 text-sm">{error}</p>
                </Block>
              )
            }
          />

          <Block nested className="text-right mt-2 mb-1">
            <RouterLink to="/auth/forgot-password" className="text-primary">
              Forgot Password?
            </RouterLink>
          </Block>
        </List>

        <Block nested>
          <Button rounded large onClick={handleLogin} disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </Block>

        <Block nested className="text-center mt-2">
          <RouterLink to="/auth/register" className="text-primary">
            Don't have an account? Sign Up
          </RouterLink>
        </Block>

        <Block nested className="my-5 relative">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-gray-500">
            Or continue with
          </span>
        </Block>

        <Block nested className="flex flex-col gap-y-2">
          <Button
            rounded
            large
            outline
            onClick={() => handleSocialLogin("google")}
            disabled={loading}
          >
            <Google className="w-5 h-5 mr-2" />
            Google
          </Button>
          <Button
            rounded
            large
            outline
            onClick={() => handleSocialLogin("facebook")}
            disabled={loading}
          >
            <Facebook className="w-5 h-5 mr-2" fill="#0866FF" />
            Facebook
          </Button>
        </Block>
      </Block>

      <Toast opened={toast.show}>
        <div className="text-center">{toast.message}</div>
      </Toast>
    </Page>
  );
};

export default LoginPage;
