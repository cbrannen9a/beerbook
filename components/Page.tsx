import React, { FC } from "react";
import { NextSeo } from "next-seo";
import { SiteUrl, SiteTitle } from "@/constants";

const Page: FC<PageProps> = ({ name, path, children }) => {
  const title = `${SiteTitle} | ${name}`;
  const url = `${SiteUrl}${path}`;

  return (
    <>
      <NextSeo
        title={title}
        canonical={url}
        openGraph={{
          url,
          title,
        }}
      />
      {children}
    </>
  );
};

type PageProps = {
  name: string;
  path: string;
};

export default Page;
