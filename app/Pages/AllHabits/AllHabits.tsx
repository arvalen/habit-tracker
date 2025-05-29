import React from "react";
import AllHabitsTopBar from "./Components/AllHabitsTopBar";
import AllHabitsRightSideBar from "./Components/AllHabitsRightSideBar";
import HabitsContainer from "./Components/HabitsContainer";
import HabitsCompleted from "./Components/HabitsCompleted";

function AllHabits() {
    return (
        <div className=" w-full flex ">
            <div className=" w-[80%] m-5">
                <AllHabitsTopBar />
                <HabitsContainer />
                <HabitsCompleted />
            </div>

            <AllHabitsRightSideBar />
        </div>
    )
}

export default AllHabits;
