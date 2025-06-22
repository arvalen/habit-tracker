import { SignUp } from "@clerk/nextjs";
import React from "react";

function SignUpPage() {
  const defaultColor = "#0048b5";
  const gradientColor = `linear-gradient(to bottom, ${defaultColor}, #0048b5)`;
  return (
    <div
      style={{ background: gradientColor }}
      className="flex justify-center items-center flex-col gap-10 w-full h-screen"
    >
      <SignUp />
    </div>
  );
}

export default SignUpPage;
