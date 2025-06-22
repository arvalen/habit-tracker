import React, { useState, useEffect, useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useGlobalContextProvider } from "@/app/contextApi";

import { AreaType } from "@/app/Types/GlobalTypes";
import { darkModeColor, defaultColor } from "@/colors";

export default function AreasContainer() {
  const { allAreasObject, darkModeObject, selectedAreaStringObject } =
    useGlobalContextProvider();
  const { allAreas } = allAreasObject;
  const { isDarkMode } = darkModeObject;
  const { setSelectedAreaString } = selectedAreaStringObject;

  const [selectedAreas, setSelectedAreas] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleSelection = (index: number) => {
    const selectedAreasCopy = { ...selectedAreas };

    Object.keys(selectedAreasCopy).forEach((key) => {
      selectedAreasCopy[parseInt(key)] = false;
    });

    selectedAreasCopy[index] = true;

    setSelectedAreaString(allAreas[index].name);

    setSelectedAreas(selectedAreasCopy);
  };

  useEffect(() => {
    const initialSelectedArea: { [key: number]: boolean } = {};

    allAreas.forEach((_, index) => {
      initialSelectedArea[index] = false;
    });

    initialSelectedArea[0] = true;

    setSelectedAreas(initialSelectedArea);
  }, [allAreas]);

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="p-5    rounded-md flex gap-3 items-center  transition-all mt-5 text-sm "
    >
      <div className="  flex gap-3  ">
        {allAreas.map((area: AreaType, index) => (
          <div onClick={() => toggleSelection(index)} key={index}>
            <SingleAreaContainer
              singleArea={area}
              isSelected={selectedAreas[index]}
            />
          </div>
        ))}
      </div>
    </div>
  );

  function SingleAreaContainer({
    singleArea,
    isSelected,
  }: {
    singleArea: AreaType;
    isSelected: boolean;
  }) {
    return (
      <div
        className={`  p-2 px-3  rounded-md flex gap-2   items-center cursor-pointer select-none ${
          isSelected ? "bg-customBlue text-white" : "text-gray-400"
        } `}
      >
        <FontAwesomeIcon icon={singleArea.icon} />
        <span>{singleArea.name}</span>
      </div>
    );
  }
}
