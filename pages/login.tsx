import { FC } from "react";
import { Login, Page } from "@/components";

const LoginPage: FC = () => (
  <Page name="Login" path="/login">
    <Login />
  </Page>
);

export default LoginPage;
