import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from "firebase/auth";
import { auth } from "./config";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
    confirmationResult?: ConfirmationResult;
  }
}

export function setupRecaptcha(containerId: string) {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      containerId,
      {
        size: "invisible",
      }
    );
  }

  return window.recaptchaVerifier;
}

export async function sendOTP(phoneNumber: string) {
  const appVerifier = setupRecaptcha("recaptcha-container");

  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    appVerifier
  );

  window.confirmationResult = confirmationResult;

  return confirmationResult;
}

export async function verifyOTP(code: string) {
  if (!window.confirmationResult) {
    throw new Error("OTP session not found.");
  }

  return await window.confirmationResult.confirm(code);
}