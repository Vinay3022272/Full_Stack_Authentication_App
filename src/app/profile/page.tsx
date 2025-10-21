"use client";
import React from "react";

function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-400">
          Profile
        </h1>

        {/* Profile content */}
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://i.ibb.co/5BCcDYB/Remote2.png"
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />

          <h2 className="text-xl font-semibold">Hello User</h2>
          <p className="text-gray-400 text-sm">user@example.com</p>

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
