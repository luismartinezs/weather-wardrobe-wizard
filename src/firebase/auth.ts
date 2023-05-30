import { signInWithEmailAndPassword, createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithRedirect, GithubAuthProvider, connectAuthEmulator, updateProfile, EmailAuthProvider, reauthenticateWithCredential, type User, updateEmail, updatePassword } from "firebase/auth";

import firebase_app from "@/firebase/config";

const auth = getAuth(firebase_app);
if (process.env.NEXT_PUBLIC_FIREBASE_EMULATOR !== undefined && process.env.NEXT_PUBLIC_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://localhost:9099');
}

type AsyncFunction<Params extends any[], Return> = (...args: Params) => Promise<Return>;
export type WithErrorHandling = <Params extends any[], Return>(fn: AsyncFunction<Params, Return>) => (...args: Params) => Promise<{ result: Return | null, error: any | null }>;

const withErrorHandling: WithErrorHandling = (fn) => async (...args) => {
  try {
    const result = await fn(...args);
    return { result, error: null };
  } catch (error) {
    return { result: null, error };
  }
};

const signIn = withErrorHandling((email, password) => signInWithEmailAndPassword(auth, email, password));
const signUp = withErrorHandling(async (email, password, displayName) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }
  return userCredential;
});

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
const githubProvider = new GithubAuthProvider();

const googleSignUp = () => signInWithRedirect(auth, googleProvider);
const githubSignUp = () => signInWithRedirect(auth, githubProvider);
const signOut = () => auth.signOut();

const editProfile = withErrorHandling(async (user: User, { email, displayName }: {
  email: string,
  displayName?: string
}) => {
  if (displayName && displayName !== user.displayName) {
    await updateProfile(user, {
      displayName,
    });
  }

  if (email && email !== user.email) {
    await updateEmail(user, email);
  }
})

const editPassword = withErrorHandling(async (user: User, { password, newPassword }: {
  password: string
  newPassword: string
}) => {
  if (!user.email) {
    return
  }
  const credential = EmailAuthProvider.credential(
    user.email,
    password
  );
  console.log('user', user)
  console.log('credential', credential)
  console.log(password)
  console.log(newPassword)
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
})

export {
  signIn,
  signUp,
  googleProvider,
  googleSignUp,
  signOut,
  auth,
  githubSignUp,
  editProfile,
  editPassword
}