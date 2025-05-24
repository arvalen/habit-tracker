"use client";

import React from "react";
import { SignOutButton, useUser } from "@clerk/nextjs";

function Dashboard() {
  const { user } = useUser();

  return (
    <div>
        Hello, {user?.firstName} <SignOutButton>Sign Out</SignOutButton>
    </div>
  );
}

export default Dashboard;