import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGlobalContextProvider } from "@/app/contextApi";
import { darkModeColor, defaultColor } from "@/colors";

function DarkMode() {
    const { darkModeObject } = useGlobalContextProvider();
    const { isDarkMode, setDarkMode, darkModeItems, setDarkModeItems } = darkModeObject;


    function handleClickedItem(singleItemIndex: number) {
        const updateDarkModeItems = darkModeItems.map((darkModeItems, index) => {
            if (singleItemIndex === index) {
                return { ...darkModeItems, isSelected: true };
            }

            return { ...darkModeItems, isSelected: false };
        });
        
        setDarkModeItems(updateDarkModeItems);
    }

    useEffect(() => {
        darkModeItems.forEach((singleItem) => {
            if (singleItem.id === 1 && singleItem.isSelected) {
                setDarkMode(false);
            }

            if (singleItem.id === 2 && singleItem.isSelected) {
                setDarkMode(true);
            }
        });
    }, [darkModeItems, setDarkMode]);

    console.log(darkModeItems);

    return (
        <div 
            style={{
                backgroundColor: isDarkMode 
                    ? darkModeColor.backgroundSlate
                    : defaultColor.backgroundSlate
            }}            
            className="w-[90px] relative rounded-3xl flex"
            >
            {darkModeItems.map((singleItem, singleItemIndex) => (
                <div
                    key={singleItemIndex}
                    onClick={() => handleClickedItem(singleItemIndex)}
                    className=" h-full w-[45px] z-40 flex justify-center items-center"
                >
                    <FontAwesomeIcon
                        className={`${
                            singleItem.isSelected ? "text-customRed" : "text-gray-300"
                        } cursor-pointer`}
                        icon={singleItem.icon}
                        width={20}
                        height={20}                    
                    />
                </div>
            ))}

            <div
                style={{
                    backgroundColor: isDarkMode 
                        ? darkModeColor.backgroundSlate
                        : defaultColor.backgroundSlate
                }}
                className={`w-[38px] absolute h-[38px] top-1 transform ${
                    isDarkMode ? "translate-x-[48px]" : "translate-x-1"
                } rounded-full transition-all`}
            ></div>
        </div>
    );
}

export default DarkMode;