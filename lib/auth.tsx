import React, { useState, useEffect, useContext, createContext, FC } from "react";
import Router from "next/router";
import { AppUser, AppUserWithToken, Auth } from "@/types";
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

  const handleUser = async (rawUser?: firebase.User): Promise<AppUser | null> => {
    if (rawUser) {
      // Existing user
      const existingUser = await getUser(rawUser.uid);
      if (existingUser) {
        setUser(existingUser);
        return existingUser;
      }
    }

    // No user
    setUser(null);
    return;
  };

  const signInWithEmail = async (email: string, password: string) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async (response) => {
        const existingUser = await getUser(response.user.uid);
        setUser(existingUser);
        Router.push(routes.home.path);
      });
  };

  const signUpWithEmail = async (email: string, password: string, name: string) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        const user = await formatUser(response.user);
        const { token, ...userWithoutToken } = user;

        await createUser(user.uid, { ...userWithoutToken, name });
        setUser({ ...user, name });
        Router.push(routes.home.path);
      });
  };

  const signInWithGoogle = async (redirect = routes.home.path) => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(async (response) => {
        const user = await formatUser(response.user);
        const { token, ...userWithoutToken } = user;

        await createUser(user.uid, userWithoutToken);
        setUser(user);
        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signOut = async () => {
    Router.push(routes.home.path);

    await firebase.auth().signOut();
    return await handleUser();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signOut,
  };
}

const formatUser = async (user: firebase.User): Promise<AppUserWithToken> => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    token,
  };
};
