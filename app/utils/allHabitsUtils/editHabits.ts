import { iconToText } from "@/app/Pages/AllHabits/Components/IconsWindow/IconData";
import { HabitType, AreaType } from "@/app/Types/GlobalTypes";
import toast from "react-hot-toast";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import scheduleNotifications from "../notificationFunctions";
export default function convertIconsToTextOfHabits(habit: HabitType) {
  const { icon, areas } = habit;

  const habitIconToText = iconToText(icon as IconProp);

  const areasCopy = areas.map((area) => ({
    ...area,
    icon: iconToText(area.icon as IconProp),
  }));

  //Update the icon and the areas in the habit object to update in the DB
  const updatedHabit = { ...habit, icon: habitIconToText, areas: areasCopy };

  return updatedHabit;
}

export async function editHabit({
  allHabits,
  setAllHabits,
  selectedItems,
  habit,
}: {
  allHabits: HabitType[];
  setAllHabits: React.Dispatch<React.SetStateAction<HabitType[]>>;
  selectedItems: AreaType | HabitType | null;
  habit: HabitType;
}) {
  try {
    const currentHabitSelected = selectedItems as HabitType;
    const findTheHabit = allHabits.findIndex(
      (singleHabit) => singleHabit._id === currentHabitSelected._id
    );
    const copyAllHabits = [...allHabits];
    copyAllHabits[findTheHabit] = habit;


    //Update the icon and the areas in the habit object to update in the DB
    const updatedHabit = convertIconsToTextOfHabits(habit);

    console.log(currentHabitSelected._id);

    const response = await fetch(
      `/api/habits?habitId=${currentHabitSelected._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: updatedHabit.name,
          icon: updatedHabit.icon,
          areas: updatedHabit.areas,
          frequency: updatedHabit.frequency,
          notificationTime: updatedHabit.notificationTime,
          isNotificationOn: updatedHabit.isNotificationOn,
          completedDays: updatedHabit.completedDays,
        }),
      }
    );
    if (!response.ok) {
      // Handle non-200 HTTP status codes
      const errorData = await response.json();
      toast.error(errorData.message || "Something went wrong");
      return;
    }

    const data = await response.json();

    //Update the allHabits state
    setAllHabits(copyAllHabits);
    toast.success("Habit has been updated successfully");

    if (updatedHabit.isNotificationOn) {
      scheduleNotifications(
        updatedHabit.notificationTime,
        updatedHabit.frequency[0].days,
        updatedHabit.name
      );
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.log(error);
  }
}
