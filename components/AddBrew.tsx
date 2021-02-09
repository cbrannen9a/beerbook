import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";

import { routes } from "@/constants";

import Link from "next/link";
import { useBrew } from "@/lib";
import { BaseBrewData } from "@/types";

const AddBrew: FC = () => {
  const [status, setStatus] = useState("idle");
  const { addBrew } = useBrew();

  const { handleSubmit, register } = useForm<BaseBrewData>();

  const onSubmit = ({ name }: BaseBrewData) => {
    setStatus("loading");
    addBrew({ name, source: [], type: "test" });
  };

  if (status === "error") {
    return <div>Error</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Link href={routes.home.path}>
            <img className="mx-auto h-12 w-auto" src="/beer-flat.svg" alt="Workflow" />
          </Link>
          <h1 className="mt-6 text-center text-5xl font-extrabold text-gray-900 dark:text-white">
            Add New Brew
          </h1>
          <h2 className="mt-6 text-center text-sm font-extrabold text-gray-900 sm:text-3xl">
            Enter brew details
          </h2>
        </div>
        <div className="divide-y divide-gray-300">
          <form className="mt-8 space-y-6" onSubmit={handleSubmit((data) => onSubmit(data))}>
            <div className="rounded-md shadow-sm -space-y-px mt-6">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  ref={register({
                    required: "Please enter your name.",
                  })}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBrew;
