import {
  Page,
  Navbar,
  Block,
  ListButton,
  Card,
  Button,
  List,
  ListInput,
  BlockTitle,
  ListItem,
  Link,
} from "konsta/react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Phone, Mail, UserPlus } from "lucide-react";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <Page className="flex flex-col items-stretch justify-center">
      <BlockTitle large component="h1" className="block text-center">
        Welcome to JibonRoute
      </BlockTitle>
      <BlockTitle className="my-0 block text-center" component="p">
        Choose your preferred registration method
      </BlockTitle>
      <Block strong inset className="px-0">
        <List nested>
          <ListInput label="Name" type="text" placeholder="Your name" />

          <ListInput label="E-mail" type="email" placeholder="Your e-mail" />

          <ListInput
            label="Password"
            type="password"
            placeholder="Your password"
          />

          <Block nested className="text-right mt-4 mb-1">
            <Link component={RouterLink} to="/auth/login">
              Already have an account? Sign In
            </Link>
          </Block>
        </List>

        <Block nested>
          <Button rounded large>
            Sign Up
          </Button>
        </Block>

        <Block nested className="my-5 relative">
          <hr className="border-gray-300" />
          <span className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white px-1 text-gray-500">
            Or continue with
          </span>
        </Block>

        <Block nested className="flex flex-col gap-y-2">
          <Button rounded large outline>
            Google
          </Button>
          <Button rounded large outline>
            Facebook
          </Button>
        </Block>
      </Block>
    </Page>
  );
};

export default RegisterPage;
