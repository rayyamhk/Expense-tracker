import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const monthDaysMapping = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

const monthNames = {
  1: { long: 'January', short: 'Jan' },
  2: { long: 'February', short: 'Feb' },
  3: { long: 'March', short: 'Mar' },
  4: { long: 'April', short: 'Apr' },
  5: { long: 'May', short: 'May' },
  6: { long: 'June', short: 'Jun' },
  7: { long: 'July', short: 'Jul' },
  8: { long: 'August', short: 'Aug' },
  9: { long: 'September', short: 'Sep' },
  10: { long: 'October', short: 'Oct' },
  11: { long: 'November', short: 'Nov' },
  12: { long: 'December', short: 'Dec' },
};

const dayNames = {
  0: { long: 'Sunday', short: 'Sun' },
  1: { long: 'Monday', short: 'Mon' },
  2: { long: 'Tuesday', short: 'Tue' },
  3: { long: 'Wednesday', short: 'Wed' },
  4: { long: 'Thursday', short: 'Thur' },
  5: { long: 'Friday', short: 'Fri' },
  6: { long: 'Saturday', short: 'Sat' },
};

const utils = {
  encodeDateString,
  encodeTimeString,
  decodeDateString,
  decodeTimeString,
  getCalendarCells,
  getDatabaseTime,
  getDateTime,
  getHTMLTime,
  getDisplayTime,
  getTodayTimestampBound,
  getMonthTimestampBound,
  translateDay,
  translateMonth,
  parseTimestamp,
};

export default utils;

// function encodeDateString(millisecond, settings) {
//   return dayjs(millisecond).format(settings.date.format);
// };

// function encodeTimeString(millisecond, settings) {
//   return dayjs(millisecond).format(settings.time.format);
// };

// function decodeString(dateString, timeString, settings) {
//   if (typeof settings === 'undefined') {
//     settings = timeString;
//     return dayjs(dateString, settings.date.format, true).valueOf(); // strict parse
//   }

//   const str = `${dateString} ${timeString}`;
//   const format = `${settings.date.format} ${settings.time.format}`;
//   return dayjs(str, format, true).valueOf();
// };

function encodeDateString(YYYY, MM, DD) {
  DD = DD.toString().padStart(2, '0');
  MM = MM.toString().padStart(2, '0');
  return `${MM}/${DD}/${YYYY}`;
};

function encodeTimeString(hh, mm) {
  hh = hh.toString().padStart(2, '0');
  mm = mm.toString().padStart(2, '0');
  return `${hh}:${mm}`;
};

function decodeDateString(str) {
  return str.split('/').map((str) => parseInt(str));
};

function decodeTimeString(str) {
  return str.split(':').map((str) => parseInt(str));
};

function getCalendarCells(year, month) {
  const dayNum = new Date(year, month, 0).getDate();
  const dayOfWeek = new Date(year, month - 1, 1).getDay();

  const cells = [];
  const cellNum = Math.ceil((dayOfWeek + dayNum) / 7) * 7;
  let row;
  for (let i = 0; i < cellNum; i++) {
    if (i % 7 === 0) {
      row = [];
    }
    if (i < dayOfWeek || i > dayOfWeek + dayNum - 1) {
      row.push(null);
    } else {
      row.push(i - dayOfWeek + 1);
    }
    if (i % 7 === 6) {
      cells.push(row);
    }
  }
  return cells;
};

function getDatabaseTime(date, time) {
  return new Date(`${date} ${time}`).getTime();
};

function getDateTime(millisecond) {
  const { year, month, day, hour, minute } = parseTimestamp(millisecond);
  const date = encodeDateString(year, month, day);
  const time = encodeTimeString(hour, minute);
  return [date, time];
};

function getDisplayTime(millisecond) {
  const time = new Date(millisecond);
  const { year, month, day } = parseTimestamp(time.getTime());
  return `${translateDay(time.getDay(), 'short')} ${translateMonth(month, 'short')} ${day.toString().padStart(2, '0')}, ${year}`;
};

function getHTMLTime(millisecond) {
  const time = new Date(millisecond);
  const { year, month, day } = parseTimestamp(time.getTime());
  return `${year}-${month}-${day}`;
};

function getTodayTimestampBound() {
  const { year, month, day, instance } = parseTimestamp(Date.now());
  const timezoneOffset = instance.getTimezoneOffset() * 1000 * 60;
  return [Date.UTC(year, month - 1, day) + timezoneOffset, Date.UTC(year, month - 1, day + 1) + timezoneOffset];
};

function getMonthTimestampBound() {
  const { year, month, instance } = parseTimestamp(Date.now());
  const timezoneOffset = instance.getTimezoneOffset() * 1000 * 60;
  return [Date.UTC(year, month - 1) + timezoneOffset, Date.UTC(year, month) + timezoneOffset];
};

function parseTimestamp(timestamp) {
  const date = new Date(timestamp);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    instance: date,
  };
};

function translateDay(day, type = 'long') {
  return dayNames[day][type];
};

function translateMonth(month, type = 'long') {
  return monthNames[month][type];
};


// baseline: 2000-01-01
// function daysBetween(yyyy, mm, dd) {
//   const table = {
//     1: 0,
//     2: 31,
//     3: 59,
//     4: 90,
//     5: 120,
//     6: 151,
//     7: 181,
//     8: 212,
//     9: 243,
//     10: 273,
//     11: 304,
//     12: 334,
//   };
//   return (yyyy - 2000) * 365 + Math.ceil((yyyy - 2000) / 4) + table[mm] + (dd - 1);
// }

// function getCalendarInfo(year, month) {
//   const days = daysBetween(year, month, 1);
//   const daysOfWeek = (days + 6) % 7; // + 6 because 2000-01-01 is Sat
//   if (year % 4 === 0 && month === 2) {
//     return [daysOfWeek, 29];
//   }
//   return [daysOfWeek, monthDaysMapping[month]];
// };
