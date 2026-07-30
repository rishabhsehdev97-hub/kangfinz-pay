
import React, { useState } from "react";
import { ShieldCheck, Smartphone, ArrowRight } from "lucide-react";
import { signInWithGoogle } from "../firebase/auth";
import { sendOTP } from "../firebase/phoneAuth";

export default function LoginScreen() {
const [phone, setPhone] = useState("");
const [loading, setLoading] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8FCFA] via-white to-[#EEF8F3] flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-[#0F8A5F] flex items-center justify-center shadow-xl">
            <ShieldCheck className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#0F8A5F]">
            Kangfinz Pay
          </h1>

          <p className="mt-3 text-gray-600 leading-relaxed">
            Your Complete Financial Universe
          </p>
        </div>

        {/* Mobile Number */}
        <div className="mt-10">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mobile Number
          </label>

          <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-4 shadow-sm">
            <Smartphone className="w-5 h-5 text-[#0F8A5F]" />

            <span className="ml-3 text-gray-700 font-medium">
              +91
            </span>

            <input
  type="tel"
  placeholder="Enter mobile number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="ml-3 flex-1 outline-none bg-transparent"
/>

          </div>
        </div>

        {/* Continue Button */}
        <button
  onClick={async () => {
    if (phone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    try {
      setLoading(true);

      await sendOTP(`+91${phone}`);

      alert("OTP sent successfully.");
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }}
  className="w-full mt-5 bg-[#0F8A5F] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-[#0B6E4C] transition"
>
  {loading ? "Sending OTP..." : "Continue"}

  {!loading && <ArrowRight className="w-5 h-5" />}
</button>

        {/* Divider */}
        <div className="flex items-center my-8">
          <div className="flex-1 h-px bg-gray-200"></div>

          <span className="px-4 text-sm text-gray-500">
            OR
          </span>

          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={async () => {
            try {
              await signInWithGoogle();
            } catch (err) {
              console.error(err);
            }
          }}
          className="w-full border border-gray-300 bg-white py-4 rounded-2xl font-semibold hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-xs text-center text-gray-500 mt-8 leading-5">
          By continuing, you agree to our
          <br />
          <span className="text-[#0F8A5F] font-medium">
            Terms of Service
          </span>{" "}
          &{" "}
          <span className="text-[#0F8A5F] font-medium">
            Privacy Policy
          </span>
        </p>

      </div>
      <div id="recaptcha-container"></div>
    </div>
  );
}