import React, { FC } from "react";
import Link from "next/link";
import { routes, SiteTitle } from "@/constants";

const Brand: FC = () => (
  <Link href={routes.home.path}>
    <img className="block  h-8 w-auto" src="/beer-flat.svg" alt={SiteTitle} />
  </Link>
);

export default Brand;
