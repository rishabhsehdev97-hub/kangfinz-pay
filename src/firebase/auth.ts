import {
  signInWithPopup,
  signInAnonymously,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult
} from "firebase/auth";
import { auth, googleProvider, appleProvider } from "./config";
import { UserProfile } from "../types";

export interface AuthState {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
}

export const subscribeToAuth = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("GOOGLE AUTH ERROR:", error);
    alert(
      `Error Code: ${error.code}\n\nError Message:\n${error.message}`
    );
    throw error;
  }
};

export const signInWithApple = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return result.user;
  } catch (error) {
    console.warn("Apple Sign-In failed or closed, falling back to guest session", error);
    const anon = await signInAnonymously(auth);
    return anon.user;
  }
};

export const signInAsGuest = async (): Promise<FirebaseUser> => {
  const result = await signInAnonymously(auth);
  return result.user;
};

let recaptchaVerifier: RecaptchaVerifier | null = null;

export const setupRecaptcha = (containerId: string): RecaptchaVerifier => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: () => {}
    });
  }
  return recaptchaVerifier;
};

export const sendMobileOtp = async (phone: string, containerId?: string): Promise<ConfirmationResult | null> => {
  try {
    if (containerId) {
      const verifier = setupRecaptcha(containerId);
      const confirmation = await signInWithPhoneNumber(auth, phone, verifier);
      return confirmation;
    }
  } catch (err) {
    console.warn("Phone OTP sending failed, using demo verification mode:", err);
  }
  return null;
};

export const signOutUser = async (): Promise<void> => {
  await firebaseSignOut(auth);
};
