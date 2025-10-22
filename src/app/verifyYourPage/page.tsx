"use client";

import { useUser } from "@/context/UserContext";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function VerifyRequestPage() {
  const { email } = useUser();
  const [localEmail, setLocalEmail] = useState("");

  useEffect(() => {
    if (email) setLocalEmail(email);
  }, [email]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c]">
      <div className="bg-[#111827] text-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-indigo-400">
          Verify Your Email
        </h1>
        <p className="text-gray-300 mb-6">
          Thank you for signing up!
          <br />
          To complete your registration, please verify your email address.
        </p>

        {localEmail && (
          <p className="text-indigo-300 mb-6 font-medium">
            Verification link sent to: <br />
            <span className="text-white">{localEmail}</span>
          </p>
        )}

        <p className="text-gray-400 mb-8">
          Open your email inbox and click the link we’ve sent you.
          <br />
          Once verified, you’ll be able to log in.
        </p>

        <div className="space-y-3">
          <Link
            href="/signup"
            className="block w-full border border-gray-600 hover:bg-gray-800 transition rounded-lg py-2 font-semibold text-gray-300"
          >
            Back to Signup
          </Link>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          Didn’t receive the email?{" "}
          <button
            onClick={() =>
              alert("Resend verification link (to be implemented)")
            }
            className="text-indigo-400 hover:text-indigo-300 transition font-medium"
          >
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}
