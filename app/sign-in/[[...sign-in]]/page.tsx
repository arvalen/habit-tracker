"use client";

import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";

export default function SignIn() {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl: "/dashboard" });
  };

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-xl p-8 space-y-6">
        {/* Top Icon */}
        <div className="text-center flex justify-center">
          <Image
            src="/app.svg"
            alt="Habit Tracker Logo"
            width={200}
            height={200}
          />
        </div>

        {/* Header Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to Habit Tracker
          </p>
        </div>
        
        {/* Sign-in Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
          >
            <FontAwesomeIcon icon={faGoogle} className="text-lg" />
            Sign in with Google
          </button>
          <button
            onClick={handleGitHubSignIn}
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all"
          >
            <FontAwesomeIcon icon={faGithub} className="text-lg" />
            Sign in with GitHub
          </button>
        </div>
        
        {/* Bottom Card */}
        <div className="bg-slate-50 rounded-lg p-4 text-center">
          <FontAwesomeIcon
            icon={faCrown}
            className="text-yellow-500 text-xl mb-2"
          />
          <h3 className="font-bold text-gray-800">Get ready King</h3>
          <p className="text-sm text-gray-800">
            let your habits write your story
          </p>
        </div>
      </div>
    </div>
  );
}
