"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useEffect } from "react";
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
      console.log("Fecthed data feom token: ", res.data.user);
      setData(res.data.user);
    } catch (error: any) {
      console.log("Fetching user from token error", error.message);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
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
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />

          <h2 className="text-xl font-semibold">
            Hello {"{"} User {"}"}
          </h2>
          <p className="text-gray-400 text-sm underline">
            {!data ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data.username}`}>{data.email}</Link>
            )}
          </p>

          <p className="text-center text-gray-300 text-sm px-4 mt-2">
            Aspiring civil servant. Passionate about leadership, discipline, and
            self-growth.
          </p>

          <button
            onClick={logout}
            className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-2 rounded-lg font-semibold cursor-pointer"
          >
            Logout
          </button>
          <button
            onClick={getUserDetails}
            className="mt-6 bg-green-600 hover:bg-indigo-700 transition px-6 py-2 rounded-lg font-semibold cursor-pointer"
          >
            Get User
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
