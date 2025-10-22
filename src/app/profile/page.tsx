"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log("Logout user failed: ", error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log("Fetched data from token: ", res.data.user);
      setData(res.data.user);
    } catch (error: any) {
      console.log("Fetching user from token error", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="bg-gray-800 shadow-xl rounded-3xl p-10 w-full max-w-md transform transition-transform duration-300 hover:scale-105">
        <h1 className="text-3xl font-bold text-center mb-8 text-indigo-400 tracking-wide">
          Profile
        </h1>

        {/* Profile content */}
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/avatar.png"
            alt="avatar"
            width={96}
            height={96}
            priority
            className="w-24 h-24 rounded-full border-4 border-indigo-500 shadow-md"
          />

          <h2 className="text-xl font-semibold text-gray-200">
            Hello {data?.username || "User"}
          </h2>

          <p className="text-gray-400 text-sm underline">
            {!data ? (
              "No email available"
            ) : (
              <Link
                href={`/profile/${data.username}`}
                className="hover:text-indigo-300 transition-colors"
              >
                {data.email}
              </Link>
            )}
          </p>

          <div className="flex flex-col w-full mt-6 space-y-3">
            <button
              onClick={logout}
              className="w-full bg-indigo-600 hover:bg-indigo-700 transition-colors px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg"
            >
              Logout
            </button>

            <button
              onClick={getUserDetails}
              className="w-full bg-green-600 hover:bg-green-700 transition-colors px-6 py-3 rounded-xl font-semibold text-white shadow-md hover:shadow-lg"
            >
              Get User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
