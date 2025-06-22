"use client";

import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

export default function UserProfile() {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-3">
        {session?.user?.image ? (
          <img
            src={session.user.image}
            alt="Profile"
            className="w-16 h-16 rounded-full"
          />
        ) : (
          <span className="text-2xl font-bold text-gray-600">
            {session?.user?.name?.charAt(0) || "U"}
          </span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-gray-600 mb-1">
        {session?.user?.name || "User"}
      </h3>
      <p className="text-sm text-gray-600 mb-3">{session?.user?.email}</p>
    </div>
  );
}
