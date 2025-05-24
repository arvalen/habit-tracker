"use client";

import React, { useEffect, useState } from "react";
import Sidebar from "../Components/SideBar/Sidebar";
import { useGlobalContextProvider } from "../contextApi";
import { menuItemType } from "../Types/MenuItemType";
import Areas from "../Pages/Areas/Areas";
import AllHabits from "../Pages/AllHabits/Allhabits";
import Statistics from "../Pages/Statistics/Statistics";

function Dashboard() {
  const { menuItemsObject } = useGlobalContextProvider();
  const { menuItems } = menuItemsObject;
  const [selectedMenu, setSelectedMenu] = useState<menuItemType | null>(null);
  let selectComponent = null;

  useEffect(() => {
    menuItems.map((singleItem) => {
      if (singleItem.isSelected) {
        setSelectedMenu(singleItem);
      }
    });
  }, [menuItems])


  if (selectedMenu) {
    switch (selectedMenu.name) {
      case "All Habits":
        selectComponent = <AllHabits />;
        break;
      case "Statistics":
        selectComponent = <Statistics />;
        break;
      case "Areas":
        selectComponent = <Areas />;
        break;
      case "All Areas":
        break;
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      {selectComponent}
    </div>
  );
}

export default Dashboard;
