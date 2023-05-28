import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithRedirect, GithubAuthProvider, connectAuthEmulator } from "firebase/auth";

import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR !== undefined && process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>;

const withErrorHandling = <T extends any[], R>(fn: AsyncFunction<T, R>) => async (...args: T): Promise<{ result: R | null, error: any | null }> => {
  try {
    const result = await fn(...args);
    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
};

const signIn = withErrorHandling((name, password) => signInWithEmailAndPassword(auth, name, password));
const signUp = withErrorHandling((name, password) => createUserWithEmailAndPassword(auth, name, password));

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
const githubProvider = new GithubAuthProvider();

const googleSignUp = () => signInWithRedirect(auth, googleProvider);
const githubSignUp = () => signInWithRedirect(auth, githubProvider);
const signOut = () => auth.signOut();

export {
  signIn,
  signUp,
  googleProvider,
  googleSignUp,
  signOut,
  auth,
  githubSignUp
}