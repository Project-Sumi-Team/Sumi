import { useState } from "react";

export default function Account() {
  const [username] = useState("Luna");
  const [email] = useState("luna@example.com");

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Account Settings
        </h1>

        <p className="text-gray-600 mb-8">
          Manage your profile and account preferences.
        </p>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Profile Information
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Username
                </label>

                <input
                  type="text"
                  value={username}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  readOnly
                  className="w-full border rounded-lg px-3 py-2 bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">
              Statistics
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">0</p>
                <p className="text-gray-500 text-sm">Projects</p>
              </div>

              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">0</p>
                <p className="text-gray-500 text-sm">Chapters</p>
              </div>

              <div className="border rounded-lg p-4 text-center">
                <p className="text-2xl font-bold">0</p>
                <p className="text-gray-500 text-sm">Pages</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex gap-3">
            <button className="px-4 py-2 rounded-lg border">
              Edit Profile
            </button>

            <button className="px-4 py-2 rounded-lg bg-red-500 text-white">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}