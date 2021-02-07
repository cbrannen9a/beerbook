import { FC } from "react";
import { AddBrew, Layout, Page } from "@/components";
import { routes } from "@/constants";

const AddBrewPage: FC = () => (
  <Page name={routes.addBrew.title} path={routes.addBrew.path}>
    <Layout>
      <AddBrew />
    </Layout>
  </Page>
);

export default AddBrewPage;
