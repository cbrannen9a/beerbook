import React, { FC, useState } from "react";
import { routes, SiteTitle } from "@/constants";
import { useAuth } from "@/lib";
import { useForm } from "react-hook-form";
import Link from "next/link";

const Login: FC = () => {
  const [status, setStatus] = useState("idle");
  const { signInWithEmail, signInWithGoogle } = useAuth();

  const { handleSubmit, register } = useForm<LoginData>();

  const onLogin = ({ email, password }: LoginData) => {
    setStatus("loading");
    signInWithEmail(email, password).catch(() => {
      setStatus("error");
    });
  };

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="/beer-flat.svg" alt="Workflow" />
          <h1 className="mt-4 text-center text-5xl font-extrabold text-gray-900 dark:text-white">
            {SiteTitle}
          </h1>
          <h2 className="mt-6 text-center text-sm font-extrabold text-gray-900 sm:text-3xl">
            Sign in to your account
          </h2>
        </div>
        <div className="divide-y divide-gray-300">
          <button
            type="button"
            className="group relative w-full flex justify-center py-2 px-4  bg-white border border-indigo-600 text-sm font-medium rounded-md hover:bg-indigo-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => signInWithGoogle()}
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-2">
              <img
                className="mx-auto h-10 w-auto"
                src="/btn_google_light_normal_ios.svg"
                alt="Sign In with Google"
              />
            </span>
            Sign in with Google
          </button>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit((data) => onLogin(data))}>
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  ref={register({
                    required: "Please enter your email.",
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  ref={register({
                    required: "Please enter a password.",
                    minLength: {
                      value: 6,
                      message: "Should have at least 6 characters",
                    },
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex  justify-center">
              <a href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
            <div className="flex  justify-center">
              <Link href={routes.join.path} passHref>
                <a className="text-sm font-medium text-indigo-600 hover:text-indigo-500">Sign Up</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

type LoginData = {
  email: string;
  password: string;
};

export default Login;
