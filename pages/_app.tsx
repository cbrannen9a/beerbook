import { FC } from "react";

import type { AppProps } from "next/app";

import { AuthProvider } from "@/lib/client";
import "styles/globals.css";

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
