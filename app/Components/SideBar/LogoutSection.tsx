"use client";

import { signOut } from "next-auth/react";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LogoutSection() {
  return (
    <div
      onClick={() => signOut({ callbackUrl: "/" })}
      className="flex gap-2 text-slate-400 items-center ml-8 p-2 mt-28 hover:text-red-500 transition-all cursor-pointer"
    >
      <FontAwesomeIcon width={20} height={20} icon={faRightFromBracket} />
      <span>Log Out</span>
    </div>
  );
}
