"use client";

import {
  ReactNode,
  createContext,
  useState,
  useContext,
  useEffect,
} from "react";

import { GlobalContextType } from "./Types/GlobalContextType";
import { menuItemType } from "./Types/MenuItemType";
import { faSlack, faUpwork } from "@fortawesome/free-brands-svg-icons";
import {
  faBorderAll,
  faBriefcase,
  faCode,
  faFlask,
  faGlobe,
  faGraduationCap,
  faSortAmountDesc,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  faChartSimple,
  faLayerGroup,
  faList,
  faSun,
  faMoon,
  faRectangleList,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { DarkModeItem } from "./Types/DarkModeTypes";
import { AreaType, HabitType } from "./Types/GlobalTypes";
import AllHabits from "./Pages/AllHabits/AllHabits";
import {
  iconToText,
  textToIcon,
} from "./Pages/AllHabits/Components/IconsWindow/IconData";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { getDateString } from "./utils/allHabitsUtils/DateFunctions";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";

const GlobalContext = createContext<GlobalContextType>({
  menuItemsObject: {
    menuItems: [],
    setMenuItems: () => {},
  },
  openSideBarObject: {
    openSideBar: false,
    setOpenSideBar: () => {},
  },
  darkModeObject: {
    isDarkMode: false,
    setDarkMode: () => {},
    darkModeItems: [],
    setDarkModeItems: () => {},
  },
  habitWindowObject: {
    openHabitWindow: false,
    setOpenHabitWindow: () => {},
  },
  openTimePickerObject: {
    openTimePickerWindow: false,
    setOpenTimePickerWindow: () => {},
  },
  allAreasObject: {
    allAreas: [],
    setAllAreas: () => {},
  },
  allHabitsObject: {
    allHabits: [],
    setAllHabits: () => {},
  },
  selectedCurrentDayObject: {
    selectedCurrentDate: "",
    setSelectedCurrentDate: () => {},
  },
  offsetDayObject: {
    offsetDay: 0,
    setOffsetDay: () => {},
  },
  selectedAreaStringObject: {
    selectedAreaString: "",
    setSelectedAreaString: () => {},
  },
  allFilteredHabitsObject: {
    allFilteredHabits: [],
    setAllFilteredHabits: () => {},
  },
  openDropDownObject: {
    openDropDown: false,
    setOpenDropDown: () => {},
  },
  dropDownPositionsObject: {
    dropDownPositions: {
      top: 0,
      left: 0,
    },
    setDropDownPositions: () => {},
  },
  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },
  selectedItemsObject: {
    selectedItems: null,
    setSelectedItems: () => {},
  },
  openAreaFormObject: {
    openAreaForm: false,
    setOpenAreaForm: () => {},
  },

  openIconWindowObject: {
    openIconWindow: false,
    setOpenIconWindow: () => {},
    iconSelected: faFlask,
    setIconSelected: () => {},
  },

  searchInputObject: {
    searchInput: "",
    setSearchInput: () => {},
  },
  loadingObject: {
    isLoading: true,
    setIsLoading: () => {},
  },
});

function GlobalContextProvider({ children }: { children: ReactNode }) {
  const [menuItems, setMenuItems] = useState<menuItemType[]>([
    { name: "All Habits", isSelected: true, icon: faRectangleList },
    { name: "Statistics", isSelected: false, icon: faChartSimple },
    { name: "Areas", isSelected: false, icon: faLayerGroup },
  ]);

  const [allHabits, setAllHabits] = useState<HabitType[]>([]);

  const [darkModeItems, setDarkModeItems] = useState<DarkModeItem[]>([
    { id: 1, icon: faSun, isSelected: true },
    { id: 2, icon: faMoon, isSelected: false },
  ]);
  const [allAreas, setAllAreas] = useState<AreaType[]>([]);

  const [openSideBar, setOpenSideBar] = useState<boolean>(false);
  const [isDarkMode, setDarkMode] = useState<boolean>(false);
  const [openHabitWindow, setOpenHabitWindow] = useState<boolean>(false);
  const [openTimePickerWindow, setOpenTimePickerWindow] =
    useState<boolean>(false);
  const [selectedCurrentDate, setSelectedCurrentDate] = useState(() =>
    getDateString(new Date())
  );
  const [offsetDay, setOffsetDay] = useState(0);
  const [selectedAreaString, setSelectedAreaString] = useState<string>("All");
  const [allFilteredHabits, setAllFilteredHabits] = useState<HabitType[]>([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  const [dropDownPositions, setDropDownPositions] = useState({
    top: 0,
    left: 0,
  });

  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [selectedItems, setSelectedItems] = useState<
    HabitType | AreaType | null
  >(null);
  const { data: session, status } = useSession();
  const [openAreaForm, setOpenAreaForm] = useState(false);
  const [openIconWindow, setOpenIconWindow] = useState(false);
  const [iconSelected, setIconSelected] = useState<IconProp>(faFlask);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  console.log(isLoading);

  useEffect(() => {
    const fetchAllHabits = async () => {
      try {
        const response = await fetch(`/api/habits?userId=${session?.user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch habits");
        }
        const data: { habits: HabitType[] } = await response.json();

        const updatedHabits = data.habits.map((habit: HabitType) => {
          if (typeof habit.icon === "string") {
            return {
              ...habit,
              icon: textToIcon(habit.icon) as IconProp,
            };
          }
          return habit;
        });

        const updatedHabitsWithAreas = updatedHabits.map((habit: HabitType) => {
          const updatedAreas = habit.areas.map((area: AreaType) => {
            if (typeof area.icon === "string") {
              return {
                ...area,
                icon: textToIcon(area.icon) as IconProp,
              };
            }
            return area;
          });
          return { ...habit, areas: updatedAreas };
        });

        console.log(updatedHabitsWithAreas);

        setAllHabits(updatedHabitsWithAreas);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    async function fetchAllAreas() {
      try {
        const response = await fetch(`/api/areas?userId=${session?.user?.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch areas");
        }
        const data: { areas: AreaType[] } = await response.json();

        //Create the All Area if the user has no areas and the first time the user opens the app
        if (data.areas.length === 0) {
          const allArea = await addTheAllAreas();
          if (typeof allArea?.icon === "string") {
            const updatedArea = {
              ...allArea,
              icon: textToIcon(allArea.icon) as IconProp,
            };

            setAllAreas([updatedArea]);
          }
        } else {
          const updatedAreas = data.areas.map((area: AreaType) => {
            if (typeof area.icon === "string") {
              return {
                ...area,
                icon: textToIcon(area.icon) as IconProp,
              };
            }
            return area;
          });

          setAllAreas(updatedAreas);
        }
      } catch (error) {
        console.error("Error fetching areas:", error);
      }
    }

    if (status === "authenticated" && session?.user?.id) {
      fetchAllHabits();
      fetchAllAreas();
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [session, status]);

  async function addTheAllAreas() {
    const allArea = {
      name: "All",
      icon: "faGlobe",
      userId: session?.user?.id as string,
    };

    try {
      const response = await fetch("/api/areas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allArea),
      });

      if (!response.ok) {
        throw new Error("Failed to add area");
      }
      
      const data = await response.json();
      const { _id } = data.area;
      const updatedIdOfArea = { ...allArea, _id: _id };

      return updatedIdOfArea;
    } catch (error) {
      console.error("Error adding default area:", error);
      return null;
    }
  }

  //Each time the menu items are updated, the sidebar is closed
  useEffect(() => {
    setOpenSideBar(false);
    setOpenAreaForm(false);
    setOpenConfirmationWindow(false);
    setOpenHabitWindow(false);
    setOpenIconWindow(false);
  }, [menuItems]);

  //Jsx
  return (
    <GlobalContext.Provider
      value={{
        menuItemsObject: { menuItems, setMenuItems },
        openSideBarObject: { openSideBar, setOpenSideBar },
        darkModeObject: {
          isDarkMode,
          setDarkMode,
          darkModeItems,
          setDarkModeItems,
        },
        habitWindowObject: {
          openHabitWindow,
          setOpenHabitWindow,
        },
        openTimePickerObject: {
          openTimePickerWindow,
          setOpenTimePickerWindow,
        },
        allAreasObject: {
          allAreas,
          setAllAreas,
        },
        allHabitsObject: {
          allHabits,
          setAllHabits,
        },
        selectedCurrentDayObject: {
          selectedCurrentDate,
          setSelectedCurrentDate,
        },
        offsetDayObject: {
          offsetDay,
          setOffsetDay,
        },
        selectedAreaStringObject: {
          selectedAreaString,
          setSelectedAreaString,
        },
        allFilteredHabitsObject: {
          allFilteredHabits,
          setAllFilteredHabits,
        },
        openDropDownObject: {
          openDropDown,
          setOpenDropDown,
        },
        dropDownPositionsObject: {
          dropDownPositions,
          setDropDownPositions,
        },
        openConfirmationWindowObject: {
          openConfirmationWindow,
          setOpenConfirmationWindow,
        },
        selectedItemsObject: {
          selectedItems,
          setSelectedItems,
        },
        openAreaFormObject: {
          openAreaForm,
          setOpenAreaForm,
        },
        openIconWindowObject: {
          openIconWindow,
          setOpenIconWindow,
          iconSelected,
          setIconSelected,
        },
        searchInputObject: {
          searchInput,
          setSearchInput,
        },
        loadingObject: {
          isLoading,
          setIsLoading,
        },
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContextProvider() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContextProvider must be used within a GlobalContextProvider"
    );
  }
  return context;
}

export default GlobalContextProvider;
