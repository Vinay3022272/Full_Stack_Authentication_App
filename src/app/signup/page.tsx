"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useUser } from "@/context/UserContext";


function SignUpPage() {
  const router = useRouter();
   const { setEmail } = useUser();

  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [btnDisabled, setBtnDisabled] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [emailError, setEmailError] = React.useState("");

  // Enable button only when all fields are filled
  useEffect(() => {
    if (
      user.username.trim().length > 0 &&
      user.email.trim().length > 0 &&
      user.password.trim().length > 0
    ) {
      setBtnDisabled(false);
      setEmail(user.email);
    } else {
      setBtnDisabled(true);
    }
  }, [user]);

  // Frontend email validation
  const validateEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onSignup = async () => {
    if (!validateEmail(user.email)) {
      setEmailError("Invalid email format!");
      return;
    } else {
      setEmailError("");
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("Signup Successful:", res.data);
      router.push("/verifyYourPage");
    } catch (error: any) {
      console.log(
        "Signup failed",
        error.response?.data?.message || error.message
      );
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Create an Account
        </h1>

        <div className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Username
            </label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="Enter your username"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Enter your password"
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-400 text-white"
            />
          </div>

          {/* Signup Button */}
          <button
            onClick={onSignup}
            disabled={btnDisabled || loading}
            className={`w-full py-2 rounded-lg font-semibold transition  ${
              btnDisabled || loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } hover: cursor-pointer`}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>

          {/* Login link */}
          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link
              href="/profile"
              className="text-indigo-400 hover:underline font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
