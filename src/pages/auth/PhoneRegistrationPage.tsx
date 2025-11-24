import { useState } from "react";
import { Page, Navbar, Block, List, ListInput, Button } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { Phone } from "lucide-react";

const PhoneRegistrationPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [countryCode, setCountryCode] = useState("+880");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");

  const handleSendOTP = () => {
    console.log("Sending OTP to:", countryCode + phoneNumber);
    setStep("otp");
  };

  const handleVerifyOTP = () => {
    console.log("Verifying OTP:", otp);
    navigate("/auth/profile-creation");
  };

  return (
    <Page>
      <Navbar 
        title="Phone Registration" 
        left={
          <button onClick={() => step === "otp" ? setStep("phone") : navigate(-1)}>
            Back
          </button>
        }
      />
      
      <Block className="space-y-4 mt-4">
        {step === "phone" ? (
          <>
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-life-green/10 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-life-green" />
              </div>
              <h2 className="text-xl font-bold mb-2">Enter Your Phone Number</h2>
              <p className="text-gray-600">We'll send you a verification code</p>
            </div>

            <List strongIos outlineIos>
              <ListInput
                label="Country Code"
                type="select"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+880">+880 (Bangladesh)</option>
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
              </ListInput>
              
              <ListInput
                label="Phone Number"
                type="tel"
                placeholder="1712345678"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                clearButton
              />
            </List>

            <Button
              large
              className="w-full"
              disabled={phoneNumber.length < 10}
              onClick={handleSendOTP}
            >
              Send OTP
            </Button>
          </>
        ) : (
          <>
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Verify Your Number</h2>
              <p className="text-gray-600">
                Code sent to {countryCode} {phoneNumber}
              </p>
            </div>

            <List strongIos outlineIos>
              <ListInput
                label="Enter OTP"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                clearButton
              />
            </List>

            <Button
              large
              className="w-full"
              disabled={otp.length !== 6}
              onClick={handleVerifyOTP}
            >
              Verify OTP
            </Button>

            <div className="text-center mt-4">
              <button className="text-life-green text-sm" onClick={() => console.log("Resend OTP")}>
                Didn't receive code? Resend
              </button>
            </div>
          </>
        )}
      </Block>
    </Page>
  );
};

export default PhoneRegistrationPage;
