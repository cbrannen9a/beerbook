import { FC } from "react";

import { Layout, Page } from "@/components";
import { routes } from "@/constants";
import { useAuth } from "@/lib";
import Link from "next/link";

const Home: FC = () => {
  const { user } = useAuth();
  return (
    <Page name={routes.home.title} path={routes.home.path}>
      <Layout>
        <div>{user?.name}</div>
        <Link href={routes.addBrew.path} passHref>
          <a className="relative w-full m-2 py-2 px-4 text-indigo-600 bg-white border border-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Add New Beer
          </a>
        </Link>
      </Layout>
    </Page>
  );
};

export default Home;
