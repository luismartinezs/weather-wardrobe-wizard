import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithRedirect, GithubAuthProvider } from "firebase/auth";

import firebase_app from "./config";

const auth = getAuth(firebase_app);

type AsyncFunction<T extends any[], R> = (...args: T) => Promise<R>;

const withErrorHandling = <T extends any[], R>(fn: AsyncFunction<T, R>) => async (...args: T): Promise<{ result: R | null, error: any | null }> => {
  try {
    const result = await fn(...args);
    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
};

const signIn = withErrorHandling(signInWithEmailAndPassword);
const signUp = withErrorHandling(createUserWithEmailAndPassword);

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