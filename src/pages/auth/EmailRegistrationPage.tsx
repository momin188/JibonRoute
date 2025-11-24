import { useState } from "react";
import { Page, Navbar, Block, List, ListInput, Button } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

const EmailRegistrationPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailRegistration = () => {
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }
    console.log("Registering with email:", email);
    navigate("/auth/profile-creation");
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Logging in with ${provider}`);
    navigate("/auth/profile-creation");
  };

  return (
    <Page>
      <Navbar 
        title="Email Registration" 
        left={<button onClick={() => navigate(-1)}>Back</button>}
      />
      
      <Block className="space-y-4 mt-4">
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-life-green/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-life-green" />
          </div>
          <h2 className="text-xl font-bold mb-2">Create Your Account</h2>
          <p className="text-gray-600">Register with email and password</p>
        </div>

        <List strongIos outlineIos>
          <ListInput
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            clearButton
          />
          
          <ListInput
            label="Password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            clearButton
          />

          <ListInput
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            clearButton
          />
        </List>

        <Button
          large
          className="w-full"
          disabled={!email || !password || !confirmPassword}
          onClick={handleEmailRegistration}
        >
          Register
        </Button>

        <div className="text-center text-gray-600 my-4">
          <span>or continue with</span>
        </div>

        <div className="space-y-2">
          <Button
            large
            outline
            className="w-full"
            onClick={() => handleSocialLogin("Google")}
          >
            Continue with Google
          </Button>
          
          <Button
            large
            outline
            className="w-full"
            onClick={() => handleSocialLogin("Facebook")}
          >
            Continue with Facebook
          </Button>
        </div>
      </Block>
    </Page>
  );
};

export default EmailRegistrationPage;
