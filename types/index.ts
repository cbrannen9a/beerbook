export type Auth = {
  user: AppUser;
  status: AuthStatus;

  signInWithEmail: (email: any, password: any) => Promise<void>;
  signInWithGitHub: (redirect: any) => Promise<void>;
  signInWithGoogle: (redirect: string) => Promise<void>;
  signOut: () => Promise<false | AppUser>;
};

export type AuthStatus = "loading" | "success" | "error";

export interface AppUserWithToken extends AppUser {
  token: string;
}

export interface AppUser {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
  stripeRole: string;
}
