"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUp() {
  const router = useRouter();

  useEffect(() => {
    router.push("/sign-in");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Redirecting to Sign In...
        </h2>
        <p className="text-gray-600">
          Please sign in with your Google or GitHub account to get started.
        </p>
      </div>
    </div>
  );
}
