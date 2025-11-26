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
import { useNavigate } from "react-router-dom";
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

    // Basic email validation
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
      <Page>
        <Navbar title="Password Reset" />

        <Block className="mt-8 pb-24">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Check Your Email</h1>
            <p className="text-gray-600 mb-2">
              We've sent a password reset link to:
            </p>
            <p className="font-semibold text-gray-800 mb-6">{email}</p>
            <p className="text-sm text-gray-500 mb-8">
              Click the link in the email to reset your password.
              <br />
              (This is a demo - check console for the reset link)
            </p>
            <Button
              large
              className="w-full bg-life-green mb-3"
              onClick={() => navigate("/auth/login")}
            >
              Back to Login
            </Button>
            <Link onClick={() => setSuccess(false)}>Use a different email</Link>
          </div>
        </Block>
      </Page>
    );
  }

  return (
    <Page>
      <Navbar
        title="Forgot Password"
        left={<Link onClick={() => navigate(-1)}>Back</Link>}
      />

      <Block className="mt-8 pb-24">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-10 h-10 text-life-green" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <List strongIos outlineIos className="mb-4">
          <ListInput
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            clearButton
          />
        </List>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <Button
          large
          className="w-full bg-life-green mb-4"
          onClick={handleResetPassword}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </Button>

        <div className="text-center text-sm">
          <span className="text-gray-600">Remember your password? </span>
          <Link onClick={() => navigate("/auth/login")}>Login</Link>
        </div>
      </Block>
    </Page>
  );
};

export default ForgotPasswordPage;
