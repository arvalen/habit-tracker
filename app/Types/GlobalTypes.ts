import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface AreaType {
  _id: string;
  name: string;
  icon: any;
  userId: string;
}

export interface HabitType {
  _id: string;
  name: string;
  icon: any;
  userId: string;
  frequency: FrequencyType[];
  notificationTime: string;
  isNotificationOn: boolean;
  areas: AreaType[];
  completedDays: CompletedDayType[];
}

export interface FrequencyType {
  type: string;
  days: string[];
  number: number;
}

export interface CompletedDayType {
  _id: string;
  date: string;
}
