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

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const handleRegister = async () => {
    setError("");

    if (!formData.name) {
      setError("Name is required");
      return;
    }
    if (!formData.email) {
      setError("Email is required");
      return;
    }
    if (!formData.password) {
      setError("Password is required");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const result = await mockAuthService.register({
        email: formData.email,
        password: formData.password,
        registrationType: "email",
      });

      if (result.success) {
        // Store name temporarily to be used in profile setup
        localStorage.setItem("tempUserName", formData.name);
        navigate("/auth/profile-setup", { state: { userId: result.userId } });
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
    <Page className="flex flex-col justify-center">
      <BlockTitle large component="h1" className="block text-center">
        Welcome to JibonRoute
      </BlockTitle>
      <BlockTitle className="my-0 block text-center" component="p">
        Create your account to get started
      </BlockTitle>

      <Block strong inset className="px-0">
        <List nested>
          <ListInput
            label="Name"
            type="text"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <ListInput
            label="E-mail"
            type="email"
            placeholder="Your e-mail"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <ListInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Your password"
            className="relative bg-red-400"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            // inputClassName="after:content-['']"
            input={
              <>
                <input
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="h-10 block text-base appearance-none w-full focus:outline-none bg-transparent after:content-[''] after:bg-red-500 placeholder-black/30 dark:placeholder-white/30"
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

          <Block nested className="mt-4 mb-1">
            <p className="text-sm text-gray-600 text-center">
              By signing up, you agree to our{" "}
              <RouterLink to="/terms" className="text-primary underline">
                Terms of Service
              </RouterLink>{" "}
              and{" "}
              <RouterLink to="/privacy" className="text-primary underline">
                Privacy Policy
              </RouterLink>
            </p>
          </Block>
        </List>

        <Block nested>
          <Button rounded large onClick={handleRegister} disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </Block>

        <Block nested className="text-center mt-2">
          <RouterLink to="/auth/login" className="text-primary">
            Already have an account? Sign In
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

export default RegisterPage;
