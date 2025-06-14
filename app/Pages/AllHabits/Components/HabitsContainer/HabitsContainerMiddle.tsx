import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Checkbox, IconButton } from "@mui/material";
import React from "react";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";

export default function HabitsContainerMiddle() {
  return (
    <div className="p-3">
      <HabitCard />
      <HabitCard />
      <HabitCard />
    </div>  
  );

  function HabitCard() {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode } = darkModeObject;
    
    return (
      // Element for the whole Habit Cards
      <div className="flex p-3 items-center justify-between">
        {/* The rounded checkbox */}
        <Checkbox
          icon={<RadioButtonUncheckedIcon />}
          checkedIcon={<CheckCircleIcon />}
          sx={{
            color: defaultColor.default,
            "&.Mui-checked": {
              color: defaultColor.default,
            },
          }}
        />

        <div
          style={{
            backgroundColor: isDarkMode
              ? darkModeColor.backgroundSlate
              : defaultColor.backgroundSlate,
          }} 
          className="flex justify-between gap-2 w-full p-3 py-4 rounded-md"
        >
          <div className="w-full">
            {/* Divs for the icon and the name of the habit */}
            <div className="flex gap-2 justify-between">
              <div className="flex gap-2 items-center">
                <FontAwesomeIcon
                  className="p-3 rounded-full w-4 h-4 bg-customRed text-white"
                  height={20}
                  width={20}
                  icon={faCode}
                />
                <span className="">Coding</span>
              </div>
            </div>
            {/* Divs for the areas */}
            <div className="flex gap-2 mt-2">
              <div
                style={{
                  color: isDarkMode
                    ? darkModeColor.textColor
                    : defaultColor.textColor,
                  backgroundColor: isDarkMode
                    ? defaultColor[50]
                    : defaultColor[100],
                }}
                className="p-1 text-[12px] rounded-md px-2"
              >
                <span className=" ">Area1</span>
              </div>

              <div
                style={{ 
                  color: isDarkMode
                    ? darkModeColor.textColor
                    : defaultColor.textColor,
                  backgroundColor: isDarkMode
                    ? defaultColor[50]
                    : defaultColor[100],
                }}
                className="p-1 text-[12px] rounded-md px-2"
              >
                <span className=" ">Area2</span>
              </div>
            </div>
          </div>
          {/* Divs for the three dots button */}
          <div className="w-10 flex items-center justify-center">
            <IconButton>
              <MoreVertIcon sx={{color: isDarkMode ? "white" : "gray"}} />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}
