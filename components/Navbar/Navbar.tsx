import React, { FC } from "react";

import { useAuth } from "@/lib";

import Authed from "./Authed";
import UnAuthed from "./UnAuthed";

const Navbar: FC = () => {
  const { user } = useAuth();

  return <nav>{user ? <Authed /> : <UnAuthed />}</nav>;
};

export default Navbar;
