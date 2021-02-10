import React, { FC } from "react";
import { useAuth } from "@/lib/client";
import { routes } from "@/constants";
import Link from "next/link";

const Authed: FC = () => {
  const { user, signOut } = useAuth();
  return (
    <>
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <img className="block lg:hidden h-8 w-auto" src="/beer-flat.svg" alt="Workflow" />
              <img className="hidden lg:block h-8 w-auto" src="/beer-flat.svg" alt="Workflow" />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href={routes.home.path} passHref>
                  <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                    {routes.home.title}
                  </a>
                </Link>
                <Link href={routes.myBrews.path} passHref>
                  <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
                    {routes.myBrews.title}
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                <button
                  onClick={() => signOut()}
                  className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src={user.photoUrl} alt="" />
                </button>
              </div>
              {/* 
          <div
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu"
          >
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Sign out
            </a>
          </div> */}
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link href={routes.home.path} passHref>
            <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
              {routes.home.title}
            </a>
          </Link>
          <Link href={routes.myBrews.path} passHref>
            <a className="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium">
              {routes.myBrews.title}
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Authed;
