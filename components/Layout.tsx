import React, { FC } from "react";
import Navbar from "./Navbar";

const Layout: FC = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

export default Layout;
