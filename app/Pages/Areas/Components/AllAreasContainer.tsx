"use client";

import { faFlask, faStairs } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React, { useState } from "react";
import { useGlobalContextProvider } from "@/app/contextApi";
import { AreaType } from "@/app/Types/GlobalTypes";
import { textToIcon } from "../../AllHabits/Components/IconsWindow/IconData";
import { darkModeColor, defaultColor } from "@/colors";
import DropDown from "@/app/Dropdown";
import DataFormModal from "@/Modal";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import addNewArea from "@/app/utils/allAreasUtils/addNewArea";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import editArea from "@/app/utils/allAreasUtils/editArea";
import { HabitType } from "@/app/Types/GlobalTypes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";

function AllAreasContainer() {
  const {
    allAreasObject: { allAreas, setAllAreas },
    darkModeObject: { isDarkMode },
    openAreaFormObject: { openAreaForm, setOpenAreaForm },
    selectedItemsObject: { selectedItems, setSelectedItems },
    openIconWindowObject: { setOpenIconWindow, iconSelected },
    allHabitsObject: { allHabits, setAllHabits },
  } = useGlobalContextProvider();

  const { data: session } = useSession();

  const [areaItem, setAreaItem] = useState<AreaType>({
    _id: "",
    name: "",
    icon: faFlask,
    userId: session?.user?.id as string,
  });

  function handleOnClose() {
    setOpenAreaForm(!openAreaForm);
    setSelectedItems(null);
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    setAreaItem({
      ...areaItem,
      name: event.target.value,
    });
  }
  function isAreaType(item: any): item is AreaType {
    return "name" in item && "icon" in item && !("frequency" in item);
  }

  function handleOnClick() {
    if (!selectedItems) {
      if (areaItem.name.trim() === "") {
        return toast.error("The area name field is still empty");
      }

      const areaExist = allAreas.some(
        (singleArea) =>
          singleArea.name.toLocaleLowerCase() ===
          areaItem.name.toLocaleLowerCase()
      );
      if (areaExist) {
        toast.error("The area already exists");
        return;
      }

      try {
        addNewArea({ allAreas, setAllAreas, areaItem });
        setOpenAreaForm(false);
      } catch (error) {}
    } else {
      if (isAreaType(selectedItems)) {
        editArea({ areaItem, allAreas, setAllAreas, allHabits, setAllHabits });
        setSelectedItems(null);
        setOpenAreaForm(false);
      }
    }
  }

  useEffect(() => {
    if (!openAreaForm) {
      setAreaItem({
        ...areaItem,
        _id: "",
        userId: session?.user?.id as string,
      });
    } else {
      if (selectedItems) {
        setAreaItem(selectedItems as AreaType);
      }
    }
  }, [openAreaForm, session]);

  useEffect(() => {
    setAreaItem({
      ...areaItem,
      icon: iconSelected,
    });
  }, [iconSelected]);

  const [areaName, setAreaName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!areaName.trim()) {
      toast.error("Please enter an area name");
      return;
    }

    const areaData = {
      name: areaName,
      icon: iconToText(iconSelected),
      userId: session?.user?.id || "",
    };

    try {
      const response = await fetch("/api/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(areaData),
      });

      if (!response.ok) {
        throw new Error("Failed to create area");
      }

      const data = await response.json();
      const newArea: AreaType = {
        ...data.area,
        icon: textToIcon(data.area.icon) as IconProp,
      };

      setAllAreas([...allAreas, newArea]);
      setOpenAreaForm(false);
      setAreaName("");
      toast.success("Area created successfully!");
    } catch (error) {
      console.error("Error creating area:", error);
      toast.error("Failed to create area");
    }
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.background
          : defaultColor.background,
      }}
      className="  w-full mt-5 p-6 flex flex-col gap-6 rounded-md"
    >
      <DropDown />
      <DataFormModal
        isOpen={openAreaForm}
        onClose={handleOnClose}
        FormTitle={selectedItems ? "Edit Area" : "Add Area"}
        textValue={areaItem.name}
        onChange={handleOnChange}
        onClick={handleOnClick}
      />

      {allAreas.map((singleArea, index) => (
        <div key={index}>
          <AreaCard singleArea={singleArea} />
        </div>
      ))}

      <div
        onClick={() => setOpenAreaForm(true)}
        className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2 text-gray-500">
          <FontAwesomeIcon icon={faPlus} />
          <span>Add New Area</span>
        </div>
      </div>
    </div>
  );
}

export default AllAreasContainer;

function AreaCard({ singleArea }: { singleArea: AreaType }) {
  const {
    darkModeObject: { isDarkMode },
    openDropDownObject: { openDropDown, setOpenDropDown },
    dropDownPositionsObject: { setDropDownPositions },
    selectedItemsObject: { setSelectedItems },
    openAreaFormObject: { openAreaForm, setOpenAreaForm },
    allHabitsObject: { allHabits, setAllHabits },
  } = useGlobalContextProvider();

  function openTheDropDown(event: React.MouseEvent<HTMLButtonElement>) {
    const target = event.target as HTMLElement;
    const rect = target.getBoundingClientRect();
    const top = rect.top;
    const left = rect.left;
    setDropDownPositions({ top, left });
    setSelectedItems(singleArea);
    setOpenDropDown(true);
  }

  function calculateHabitsCount(allHabits: HabitType[], singleArea: AreaType) {
    let count = 0;

    allHabits.forEach((habit) => {
      if (habit.areas.length > 0) {
        count += habit.areas.filter(
          (area) => area._id === singleArea._id
        ).length;
      }
    });

    return count;
  }

  function countAll(allHabits: HabitType[], singleArea: AreaType) {
    let countAll = 0;

    allHabits.forEach((habit) => {
      if (habit.areas.length === 0) {
        countAll++;
      }
    });

    return countAll;
  }

  return (
    <div
      style={{
        backgroundColor: isDarkMode
          ? darkModeColor.backgroundSlate
          : defaultColor.backgroundSlate,
        color: isDarkMode ? darkModeColor.textColor : defaultColor.textColor,
      }}
      className="flex justify-between   p-5 rounded-md"
    >
      {/* Icons and texts */}
      <div className="flex  items-center gap-4">
        <FontAwesomeIcon
          className="w-5 h-5 text-customBlue"
          height={20}
          width={20}
          icon={singleArea.icon}
        />
        <div className="flex flex-col">
          <span className="font-semibold ">{singleArea.name}</span>
          <span className="text-gray-400 text-[13px] flex gap-[2px] items-center">
            <span className=" ">
              {singleArea.name === "All"
                ? countAll(allHabits, singleArea)
                : calculateHabitsCount(allHabits, singleArea)}
            </span>
            <span className=" font-light">Habits</span>
          </span>
        </div>
      </div>
      {/* Three dots */}
      {/* div for the three dots button */}
      <div className="w-10 flex items-center justify-center">
        {singleArea.name !== "All" && (
          <IconButton onClick={openTheDropDown}>
            <MoreVertIcon sx={{ color: "gray" }} />
          </IconButton>
        )}
      </div>
    </div>
  );
}
