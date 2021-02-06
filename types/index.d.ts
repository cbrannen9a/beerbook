export type Auth = {
  user: AppUser;

  signUpWithEmail: (email: string, password: string, name: string) => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signInWithGoogle: (redirect?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

export interface AppUserWithToken extends AppUser {
  token: string;
}

export interface AppUser {
  uid: string;
  email: string;
  name: string;
  provider: string;
  photoUrl: string;
}
