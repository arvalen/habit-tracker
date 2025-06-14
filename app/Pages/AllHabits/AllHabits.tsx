import React from "react";
import AllHabitsTopBar from "./Components/AllHabitsTopBar";
import AllHabitsRightSideBar from "./Components/AllHabitsRightSideBar";
import HabitsContainer from "./Components/HabitsContainer";
import HabitsCompleted from "./Components/HabitsCompleted";
import HabitWindow from "./Components/HabitWindow";

function AllHabits() {
    return (
        <div className=" max-lg:flex-col w-full flex flex-row gap-0 relative ">
            <HabitWindow />
            <div className=" flex-col flex-grow m-3 ">
                <AllHabitsTopBar />
                <HabitsContainer />
                <HabitsCompleted />
            </div>

            <AllHabitsRightSideBar />
        </div>
    )
}

export default AllHabits;
