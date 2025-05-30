import React from "react";

import UserProfile from "./RightSideBar/UserProfile";
import MainStatistics from "./RightSideBar/MainStatistics";
import Calendar from "./RightSideBar/Calendar";


function AllHabitsRightSideBar() {
    return (
        <div className=" flex flex-col items-center-center bg-white m-3 rounded-lg p-2 ">
            <UserProfile />
            <MainStatistics />
            <Calendar/>
        </div>
    );
}

export default AllHabitsRightSideBar;
