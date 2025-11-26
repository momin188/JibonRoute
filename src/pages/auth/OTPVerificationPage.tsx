import { useState, useEffect } from "react";
import { Page, Navbar, Block, Button, Link } from "konsta/react";
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
    <Page>
      <Navbar
        title="Verify OTP"
        left={<Link onClick={() => navigate(-1)}>Back</Link>}
      />

      <Block className="mt-8 pb-24">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-life-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📱</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Verify Your Number</h1>
          <p className="text-gray-600">
            We've sent a 6-digit code to
            <br />
            <span className="font-semibold text-gray-800">{phone}</span>
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Demo: Use any 6-digit code (e.g., 123456)
          </p>
        </div>

        {/* OTP Input */}
        <div className="flex justify-center mb-6">
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
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        <Button
          large
          className="w-full bg-life-green mb-4"
          onClick={handleVerify}
          disabled={loading || otp.length !== 6}
        >
          {loading ? "Verifying..." : "Verify & Continue"}
        </Button>

        {/* Resend OTP */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-2">Didn't receive the code?</p>
          {canResend ? (
            <Link onClick={handleResend}>Resend OTP</Link>
          ) : (
            <p className="text-sm text-gray-500">
              Resend in{" "}
              <span className="font-semibold text-life-green">
                {resendTimer}s
              </span>
            </p>
          )}
        </div>
      </Block>
    </Page>
  );
};

export default OTPVerificationPage;
