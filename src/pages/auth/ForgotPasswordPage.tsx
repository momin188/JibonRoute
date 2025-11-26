import { useState } from "react";
import {
  Page,
  Navbar,
  NavbarBackLink,
  Block,
  Button,
  List,
  ListInput,
  BlockTitle,
  Toast,
} from "konsta/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import { mockAuthService } from "@/services/mockAuth";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      const result = await mockAuthService.resetPassword(email);

      if (result.success) {
        setSuccess(true);
      } else {
        setError(result.error || "Failed to send reset link");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Page className="flex flex-col justify-center">
        <Block className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </Block>

        <BlockTitle large component="h1" className="block text-center">
          Check Your Email
        </BlockTitle>
        <BlockTitle className="my-0 block text-center" component="p">
          We've sent a password reset link to:
        </BlockTitle>

        <Block className="text-center">
          <p className="font-semibold text-gray-800 mb-4">{email}</p>
          <p className="text-sm text-gray-500 mb-6">
            Click the link in the email to reset your password.
            <br />
            (This is a demo - check console for the reset link)
          </p>
        </Block>

        <Block strong inset className="px-0">
          <Block nested>
            <Button rounded large onClick={() => navigate("/auth/login")}>
              Back to Login
            </Button>
          </Block>

          <Block nested className="text-center mt-4">
            <RouterLink
              to="#"
              onClick={() => setSuccess(false)}
              className="text-primary"
            >
              Use a different email
            </RouterLink>
          </Block>
        </Block>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar
        transparent
        left={<NavbarBackLink onClick={() => navigate(-1)} />}
      />

      <Block className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Mail className="w-10 h-10 text-primary" />
        </div>
      </Block>

      <BlockTitle large component="h1" className="block text-center">
        Reset Password
      </BlockTitle>
      <BlockTitle className="my-0 block text-center" component="p">
        Enter your email and we'll send you a reset link
      </BlockTitle>

      <Block strong inset className="px-0">
        <List nested>
          <ListInput
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              error && (
                <Block nested className="mt-2 mb-0">
                  <p className="text-red-600 text-sm">{error}</p>
                </Block>
              )
            }
          />
        </List>

        <Block nested>
          <Button
            rounded
            large
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </Block>

        <Block nested className="text-center mt-4">
          <RouterLink to="/auth/login" className="text-primary">
            Remember your password? Login
          </RouterLink>
        </Block>
      </Block>
    </Page>
  );
};

export default ForgotPasswordPage;
