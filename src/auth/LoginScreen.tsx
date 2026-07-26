import React from "react";
import { signInWithGoogle } from "../firebase/auth";

export default function LoginScreen() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
      <div className="w-full max-w-sm px-6 text-center">
        <h1 className="text-4xl font-bold text-[#0F8A5F]">
          Kangfinz Pay
        </h1>

        <p className="mt-3 text-gray-600">
          Your AI-Powered Financial Operating System
        </p>

        <button
          onClick={async () => {
            try {
              await signInWithGoogle();
            } catch (err) {
              console.error(err);
            }
          }}
          className="w-full mt-10 bg-[#0F8A5F] text-white py-4 rounded-2xl font-semibold hover:bg-[#0B6E4C] transition"
        >
          Continue with Google
        </button>

        <button
          className="w-full mt-4 border border-gray-300 py-4 rounded-2xl font-semibold"
        >
          Continue with Phone Number
        </button>
      </div>
    </div>
  );
}