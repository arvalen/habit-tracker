import React from "react";
import AllHabitsSearchBar from "./AllHabitsSearchBar";
import DarkMode from "./DarkMode";
import { UserButton } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function AllHabitsTopBar () {
    const userButtonAppearance = {
        elements: {
            userButtonAvatarBox: "w-10 h-10",
            userButtonPopoverActionButton: "text-red-600",
        },
    };

    return(
        <div className="bg-white p-5 rounded-md flex justify-between">
            <div className="flex gap-4">
                <div className="max-lg:flex hidden">
                    <UserButton appearance={userButtonAppearance} />
                </div>

                <div className="flex flex-col max-md:hidden">
                    <span className="text-xl">
                        <span className="font-bold">Hi There</span>
                        <span className="font-light">, Walker</span>
                    </span>
                    <span className="font-light text-[12px] text-gray-400">
                        Welcome Back!
                    </span>
                </div>
            </div>

            <div className="w-[50%] max-md:w-[80%] flex gap-3 justify-between ">
                <AllHabitsSearchBar/>
                <DarkMode/>
                <FontAwesomeIcon
                    className="m-2 max-xl:flex hidden mt-[13px] cursor-pointer "
                    icon={faBars}
                />
            </div>
        </div>
    );
}

export default AllHabitsTopBar;