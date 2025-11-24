import { useState } from "react";
import { Page, Navbar, Block, List, ListButton, Card } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail, UserPlus } from "lucide-react";

const AuthMethodPage = () => {
  const navigate = useNavigate();

  const authMethods = [
    {
      id: "phone",
      title: "Phone Number",
      description: "Register using your phone number",
      icon: Phone,
      route: "/auth/phone"
    },
    {
      id: "email",
      title: "Email Address",
      description: "Register using email and password",
      icon: Mail,
      route: "/auth/email"
    },
    {
      id: "social",
      title: "Social Media",
      description: "Quick registration with Google or Facebook",
      icon: UserPlus,
      route: "/auth/email"
    }
  ];

  return (
    <Page>
      <Navbar title="Register" />
      
      <Block className="space-y-4 mt-4">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome to JibonRoute</h1>
          <p className="text-gray-600">Choose your preferred registration method</p>
        </div>

        <div className="space-y-3">
          {authMethods.map((method) => {
            const Icon = method.icon;
            return (
              <Card key={method.id} className="p-0">
                <ListButton
                  onClick={() => navigate(method.route)}
                  className="w-full text-left"
                >
                  <div className="flex items-center gap-4 p-4">
                    <div className="w-12 h-12 rounded-full bg-life-green/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-life-green" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{method.title}</h3>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                </ListButton>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Already have an account?</p>
          <button 
            onClick={() => navigate("/login")}
            className="text-life-green font-semibold mt-1"
          >
            Sign In
          </button>
        </div>
      </Block>
    </Page>
  );
};

export default AuthMethodPage;
