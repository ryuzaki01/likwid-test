import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime)

export const formatTimeFromNow = (date: Date | string): string => {
  const dayObj: Dayjs = dayjs(date);
  return `${dayObj.fromNow()}`;
};
