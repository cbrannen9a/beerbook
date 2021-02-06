import { FC } from "react";

import { Layout, Page } from "@/components";
import { routes } from "@/constants";
import { useAuth } from "@/lib";

const Home: FC = () => {
  const { user } = useAuth();
  return (
    <Page name={routes.home.title} path={routes.home.path}>
      <Layout>
        <div>{user?.name}</div>
      </Layout>
    </Page>
  );
};

export default Home;
