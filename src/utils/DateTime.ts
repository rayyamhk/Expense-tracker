import dayjs from 'dayjs';
import {
  CalendarCell,
  DateType,
  Settings,
} from '../types'; 

const utils = {
  getStringFromArray,
  getArrayFromTimestamp,
  getTimestampFromArray,
  getStringFromTimestamp,
  getCalendarCells,
  getDayTimestampBound,
  getMonthTimestampBound,
  translateMonth,
};

export default utils;

function getArrayFromTimestamp(timestamp: number): number[] {
  const date = new Date(timestamp);
  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
};

function getTimestampFromArray(arr: number[]) {
  const [year, month, day, hour, minute] = arr;
  return new Date(year, month, day, hour, minute).getTime();
};

function getStringFromTimestamp(timestamp: number, type: DateType, settings: Settings) {
  let format: string;
  switch (type) {
    case 'fulldate':
      format = `${settings.dateTimeFormat.date} (ddd)`;
      break;
    case 'date':
      format = settings.dateTimeFormat.date;
      break;
    case 'time':
      format = settings.dateTimeFormat.time;
      break;
    case 'datetime':
      format = `${settings.dateTimeFormat.date} ${settings.dateTimeFormat.time}`;
      break;
  };
  return dayjs(timestamp).format(format);
};

function getStringFromArray(arr: number[], type: DateType, settings: Settings) {
  let format: string;
  switch (type) {
    case 'datetime':
      format = `${settings.dateTimeFormat.date} ${settings.dateTimeFormat.time}`;
      break;
    case 'date':
      format = settings.dateTimeFormat.date;
      break;
    case 'time':
      format = settings.dateTimeFormat.time;
      break;
  };
  const [year, month, day, hour, minute] = arr;
  return dayjs(new Date(year, month, day, hour, minute)).format(format);
};

function getCalendarCells(year: number, month: number) {
  const prevMonthDayNum = new Date(year, month, 0).getDate();
  const currentMonthDayNum = new Date(year, month + 1, 0).getDate();
  const dayOfWeek = new Date(year, month, 1).getDay();

  const cells: CalendarCell[][] = [];
  let row: CalendarCell[];
  for (let i = 0; i < 42; i++) {
    if (i % 7 === 0) {
      row = [];
    }
    if (i < dayOfWeek) {
      row.push({ current: false, day: prevMonthDayNum - dayOfWeek + i + 1 })
    } else if (i >= dayOfWeek + currentMonthDayNum) {
      row.push({ current: false, day: i - dayOfWeek - currentMonthDayNum + 1 });
    } else {
      row.push({ current: true, day: i - dayOfWeek + 1 });
    }
    if (i % 7 === 6) {
      cells.push(row);
    }
  }
  return cells;
};

function getDayTimestampBound(timestamp: number): [number, number] {
  const [year, month, day] = getArrayFromTimestamp(timestamp);
  return [new Date(year, month, day).getTime(), new Date(year, month, day + 1).getTime()];
};

function getMonthTimestampBound(timestamp: number): [number, number] {
  const [year, month] = getArrayFromTimestamp(timestamp);
  return [new Date(year, month).getTime(), new Date(year, month + 1).getTime()];
};

function translateMonth(month: number, type: 'long' | 'short' = 'long'): string {
  const monthNames = [
    { long: 'January', short: 'Jan' },
    { long: 'February', short: 'Feb' },
    { long: 'March', short: 'Mar' },
    { long: 'April', short: 'Apr' },
    { long: 'May', short: 'May' },
    { long: 'June', short: 'Jun' },
    { long: 'July', short: 'Jul' },
    { long: 'August', short: 'Aug' },
    { long: 'September', short: 'Sep' },
    { long: 'October', short: 'Oct' },
    { long: 'November', short: 'Nov' },
    { long: 'December', short: 'Dec' },
  ];
  return monthNames[month]?.[type];
};