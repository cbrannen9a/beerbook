import React, { useState, useEffect, useContext, createContext } from "react";
import Router from "next/router";

import firebase from "./firebase";
import { createUser } from "./db";
import { Auth, AppUser, AuthStatus, AppUserWithToken } from "../types";

const AuthContext = createContext<Auth | undefined>(undefined);

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};

function useProvideAuth(): Auth {
  const [user, setUser] = useState<AppUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  const handleUser = async (
    rawUser?: firebase.User
  ): Promise<AppUser | null> => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;

      createUser(user.uid, userWithoutToken);
      setUser(user);

      setStatus("success");
      return user;
    } else {
      setUser(null);
      setStatus("success");
      return;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setStatus("loading");
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        handleUser(response.user);
        Router.push("/sites");
      });
  };

  const signInWithGitHub = async (redirect = "/") => {
    setStatus("loading");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signInWithGoogle = async (redirect = "/") => {
    setStatus("loading");
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((response) => {
        handleUser(response.user);

        if (redirect) {
          Router.push(redirect);
        }
      });
  };

  const signOut = async () => {
    Router.push("/");

    await firebase.auth().signOut();
    return await handleUser();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onIdTokenChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    status,
    signInWithEmail,
    signInWithGitHub,
    signInWithGoogle,
    signOut,
  };
}

const getStripeRole = async () => {
  await firebase.auth().currentUser.getIdToken(true);
  const decodedToken = await firebase.auth().currentUser.getIdTokenResult();

  return decodedToken.claims.stripeRole || "free";
};

const formatUser = async (user: firebase.User): Promise<AppUserWithToken> => {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    provider: user.providerData[0].providerId,
    photoUrl: user.photoURL,
    stripeRole: await getStripeRole(),
    token,
  };
};
