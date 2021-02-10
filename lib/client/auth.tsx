import React, { useState, useEffect, useContext, createContext, FC } from "react";
import Router from "next/router";
import { AppUser, Auth } from "@/types";
import { routes } from "@/constants";

import firebase from "./firebase";
import { createUser, getUser } from "./db";

const AuthContext = createContext<Auth | undefined>(undefined);

export const AuthProvider: FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth: () => Auth = () => {
  return useContext(AuthContext);
};

function useProvideAuth(): Auth {
  const [user, setUser] = useState<AppUser | null>(null);

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        const user = await formatUser(response.user, name);

        await createUser(user.uid, user);
        setUser({ ...user, name });
        Router.push(routes.home.path);
      })
      .catch((err) => console.log(err));
  };

  const signInWithEmail = async (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const existingUser = await getUser(response.user.uid);
        if (existingUser) {
          setUser(existingUser);
        }

        Router.push(routes.home.path);
      })
      .catch((err) => console.log(err));
  };

  const signInWithGoogle = async (redirect = routes.home.path) => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (response) => {
        const user = await formatUser(response.user);

        await createUser(user.uid, user);
        setUser(user);
        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signOut = async () => {
    Router.push(routes.home.path);

    await firebase.auth().signOut();
    return setUser(null);
  };

  const handleAuthStateChanged = async (user: firebase.User) => {
    if (user) {
      const userDetails = await getUser(user.uid);
      setUser(userDetails);
    }
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthStateChanged);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    signOut,
  };
}

const formatUser = async (user: firebase.User, name?: string): Promise<AppUser> => {
  const username = user.displayName ?? name ?? "";
  return {
    uid: user.uid,
    email: user.email,
    name: username,
    provider: user.providerData[0].providerId,
    photoUrl:
      user.photoURL ??
      `https://eu.ui-avatars.com/api/?rounded=true&background=random&name=${username}`,
  };
};

export const getCurrentUser = (): firebase.User => {
  return firebase.auth().currentUser;
};
