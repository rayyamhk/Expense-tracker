import dayjs from 'dayjs';

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

function getArrayFromTimestamp(timestamp) {
  const date = new Date(timestamp);
  return [
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
  ];
};

function getTimestampFromArray(arr) {
  return new Date(...arr).getTime();
};

function getStringFromTimestamp(timestamp, type, settings) {
  let format;
  switch (type) {
    case 'fulldate':
      format = `${settings.dateFormat.date} (ddd)`;
      break;
    case 'date':
      format = settings.dateFormat.date;
      break;
    case 'time':
      format = settings.dateFormat.time;
      break;
    case 'datetime':
      format = `${settings.dateFormat.date} ${settings.dateFormat.time}`;
      break;
    case 'html':
      format = 'YYYY-MM-DD';
      break;
  };
  return dayjs(timestamp).format(format);
};

function getStringFromArray(arr, type, settings) {
  let format;
  switch (type) {
    case 'datetime':
      format = `${settings.dateFormat.date} ${settings.dateFormat.time}`;
      break;
    case 'date':
      format = settings.dateFormat.date;
      break;
    case 'time':
      format = settings.dateFormat.time;
      break;
  };
  return dayjs(new Date(...arr)).format(format);
};

function getCalendarCells(year, month) {
  const prevMonthDayNum = new Date(year, month, 0).getDate();
  const currentMonthDayNum = new Date(year, month + 1, 0).getDate();
  const dayOfWeek = new Date(year, month, 1).getDay();

  const cells = [];
  let row;
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

function getDayTimestampBound(timestamp) {
  const [year, month, day] = getArrayFromTimestamp(timestamp);
  return [new Date(year, month, day).getTime(), new Date(year, month, day + 1).getTime()];
};

function getMonthTimestampBound(timestamp) {
  const [year, month] = getArrayFromTimestamp(timestamp);
  return [new Date(year, month).getTime(), new Date(year, month + 1).getTime()];
};

function translateMonth(month, type = 'long') {
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
  return monthNames[month][type];
};