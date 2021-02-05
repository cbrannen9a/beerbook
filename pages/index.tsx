import { FC } from "react";

import { Layout, Page } from "@/components";
import { routes } from "@/constants";

const Home: FC = () => {
  return (
    <Page name={routes.home.title} path={routes.home.path}>
      <Layout />
    </Page>
  );
};

export default Home;
