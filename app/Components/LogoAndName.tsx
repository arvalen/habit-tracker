import React from "react";
import AppIcon from "../SVG_Icons/AppIcon";
import { defaultColor } from "@/colors";


function LogoAndName() {
    return (
        <div className="flex gap-2 items-center sm:justify-start justify-center">
            <span className="text-2xl font-light flex items-center gap-2">
                {/* The Icon */}
                <div
                style={{ backgroundColor: defaultColor }}
                className=" p-2 rounded-md "
                >
                    <AppIcon color="#ffffff" height="34" width="34" />
                </div>
                {/* The Name of the app*/}
                <span
                style={{ color: defaultColor }}
                className="font-bold text-mainColor"
                >
                Habit
                </span>
                <span className="font-light"> Tracker</span>
            </span>
        </div>
    );
}

export default LogoAndName;