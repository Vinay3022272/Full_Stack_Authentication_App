"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";


function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
   const resolvedParams = React.use(params);
  const [data, setData] = useState<any>(null) 
  const getUserDetails = async () => {
      try {
        const res = await axios.get("/api/users/me");
        console.log("Fecthed data LOOP: ", res.data.user);
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
            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=96&q=80"
            alt="profile"
            width={96}
            height={96}
            priority
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />

          <h2 className="text-xl font-semibold">{resolvedParams.id}</h2>
          <p className="text-gray-400 text-sm">{data?.email}</p>

          <p className="text-center text-gray-300 text-sm px-4 mt-2">
            Aspiring civil servant. Passionate about leadership, discipline, and
            self-growth.
          </p>

          <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 transition px-6 py-2 rounded-lg font-semibold">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
