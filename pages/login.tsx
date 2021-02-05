import { FC } from "react";
import { Login, Page } from "@/components";
import { routes } from "@/constants";

const LoginPage: FC = () => (
  <Page name={routes.login.title} path={routes.login.path}>
    <Login />
  </Page>
);

export default LoginPage;
