import { sendNotifications } from "../SendNotification";

export default function scheduleNotifications(
  notificationTime: string,
  days: string[],
  habitName: string
) {
  const daysMap: Record<string, number> = {
    Su: 0,
    Mo: 1,
    Tu: 2,
    We: 3,
    Th: 4,
    Fr: 5,
    Sa: 6,
  };

  // Split the notification time into the time and the AM/PM modifier
  const [time, modifier] = notificationTime.split(" ");
  // Split the time into hours and minutes
  let [hours, minutes] = time.split(":").map(Number);
  // Adjust hours based on AM/PM modifier
  if (modifier === "PM" && hours < 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  const notificationDate = new Date();
  notificationDate.setHours(hours);
  notificationDate.setMinutes(minutes);
  notificationDate.setSeconds(0);

  const now = new Date();
  const nowDay = now.getDay();
  const nowTime = now.getTime();

  days.forEach((day) => {
    const targetDay = daysMap[day];
    let diff = targetDay - nowDay;
    if (diff < 0) diff += 7;
    const targetDate = new Date(now);
    targetDate.setDate(now.getDate() + diff);
    targetDate.setHours(hours);
    targetDate.setMinutes(minutes);
    targetDate.setSeconds(0);

    const timeout = targetDate.getTime() - nowTime;
    setTimeout(() => sendNotifications(habitName), timeout);
  });
}
