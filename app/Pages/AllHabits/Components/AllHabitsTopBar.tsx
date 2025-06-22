"use client";

import React, { useEffect } from "react";
import AllHabitsSearchBar from "./AllHabitsSearchBar";
import DarkMode from "./DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useSession, signOut } from "next-auth/react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";

function AllHabitsTopBar() {
  const { openSideBarObject, darkModeObject } = useGlobalContextProvider();
  const { openSideBar, setOpenSideBar } = openSideBarObject;
  const { isDarkMode } = darkModeObject;
  const { data: session } = useSession();

  function openSideBarFunction() {
    setOpenSideBar(!openSideBar);
  }

  useEffect(() => {
    function handleResize() {
      setOpenSideBar(false);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="  p-5     rounded-md flex justify-between transition-all"
    >
      <div className="flex gap-4">
        <div className="max-lg:flex hidden">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <span className="text-sm font-bold text-gray-600">
                  {session?.user?.name?.charAt(0) || "U"}
                </span>
              )}
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex flex-col max-md:hidden ">
          <span className="text-xl">
            <span className="font-bold">Hi King 👑</span>
            <span className="font-light"></span>
          </span>
          <span className="font-light text-[12px] text-gray-600">
            Welcome Back!
          </span>
        </div>
      </div>

      <div className="w-[50%] max-md:w-[80%] flex gap-3 justify-between ">
        <AllHabitsSearchBar />
        <DarkMode />
        <FontAwesomeIcon
          onClick={openSideBarFunction}
          className="m-2 max-xl:flex hidden  mt-[13px] cursor-pointer  "
          icon={faBars}
        />
      </div>
    </div>
  );
}

export default AllHabitsTopBar;
