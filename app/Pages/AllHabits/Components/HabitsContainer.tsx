import React from "react";
import HabitsContainerTop from "./HabitsContainer/HabitsContainerTop";
import HabitsContainerMiddle from "./HabitsContainer/HabitsContainerMiddle";

function HabitsContainer () {
    return (
        <div className="mt-5 bg-white rounded-md p-5 flex flex-col gap-3">
            <HabitsContainerTop />
            <HabitsContainerMiddle /> 
        </div>
    );
}

export default HabitsContainer;