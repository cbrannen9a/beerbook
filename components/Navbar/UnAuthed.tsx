import { routes } from "@/constants";
import Link from "next/link";
import React, { FC } from "react";
import Brand from "./Brand";

const UnAuthed: FC = () => (
  <>
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex-1 flex items-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <Brand />
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <div className="ml-3 relative">
            <div>
              <Link href={routes.login.path} passHref>
                <a className="relative w-full m-2 py-2 px-4 text-indigo-600 bg-white border border-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {routes.login.title}
                </a>
              </Link>
              <Link href={routes.join.path} passHref>
                <a className="relative w-full m-2 py-2 px-4 text-white bg-indigo-600 border border-indigo-600 text-sm font-medium rounded-md hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  {routes.join.title}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default UnAuthed;
