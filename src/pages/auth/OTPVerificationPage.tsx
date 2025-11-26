import { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  NavbarBackLink,
  Block,
  Button,
  BlockTitle,
  Link,
} from "konsta/react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { mockAuthService } from "@/services/mockAuth";

const OTPVerificationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const phone = location.state?.phone || "";
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await mockAuthService.verifyOTP(phone, otp);

      if (result.success) {
        navigate("/auth/profile-setup", { state: { phone } });
      } else {
        setError(result.error || "Invalid OTP");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setLoading(true);
    setError("");

    try {
      const result = await mockAuthService.sendOTP(phone);

      if (result.success) {
        setResendTimer(60);
        setCanResend(false);
        setOtp("");
      } else {
        setError(result.error || "Failed to resend OTP");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page className="flex flex-col justify-center">
      <Navbar
        transparent
        left={<NavbarBackLink onClick={() => navigate(-1)} />}
      />

      <Block className="text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <span className="text-4xl">📱</span>
        </div>
      </Block>

      <BlockTitle large component="h1" className="block text-center">
        Verify Your Number
      </BlockTitle>
      <BlockTitle className="my-0 block text-center" component="p">
        We've sent a 6-digit code to
        <br />
        <span className="font-semibold">{phone}</span>
      </BlockTitle>

      <Block className="text-center text-sm text-gray-500">
        Demo: Use any 6-digit code (e.g., 123456)
      </Block>

      <Block strong inset className="px-0">
        <Block nested className="flex justify-center mb-4">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </Block>

        {error && (
          <Block nested className="mb-4">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </Block>
        )}

        <Block nested>
          <Button
            rounded
            large
            onClick={handleVerify}
            disabled={loading || otp.length !== 6}
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </Button>
        </Block>

        <Block nested className="text-center mt-4">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
          {canResend ? (
            <Link onClick={handleResend}>Resend OTP</Link>
          ) : (
            <p className="text-sm text-gray-500">
              Resend in{" "}
              <span className="font-semibold text-primary">{resendTimer}s</span>
            </p>
          )}
        </Block>
      </Block>
    </Page>
  );
};

export default OTPVerificationPage;
