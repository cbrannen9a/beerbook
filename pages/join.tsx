import { FC } from "react";
import { Join, Page } from "@/components";
import { routes } from "@/constants";

const LoginPage: FC = () => (
  <Page name={routes.join.title} path={routes.join.path}>
    <Join />
  </Page>
);

export default LoginPage;
