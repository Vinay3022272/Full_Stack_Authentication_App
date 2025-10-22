"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0f1c]">
      <div className="bg-[#111827] text-white rounded-2xl shadow-2xl p-10 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-400">
          Verify Email
        </h1>

        {token ? (
          <>
            {!verified && !error && (
              <p className="text-gray-400 mb-4">Verifying your token...</p>
            )}
            {verified && (
              <div className="text-green-400">
                <p className="mb-4 text-lg font-medium">
                  Email Verified Successfully!
                </p>
                <Link href="/login">
                  <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition duration-200 hover:cursor-pointer">
                    Go to Login
                  </button>
                </Link>
              </div>
            )}
            {error && (
              <div className="text-red-400">
                <p className="mb-4 text-lg font-medium">
                  Invalid or Expired Token
                </p>
                <Link
                  href="/signup"
                  className="text-indigo-400 hover:text-indigo-300 transition"
                >
                  Signup Again
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-400">No verification token found in URL.</p>
        )}
      </div>
    </div>
  );
}
