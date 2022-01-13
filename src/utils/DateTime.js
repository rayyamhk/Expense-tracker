import dayjs from 'dayjs';

const utils = {
  getStringFromArray,
  getArrayFromTimestamp,
  getTimestampFromArray,
  getStringFromTimestamp,
  getCalendarCells,
  getTodayTimestampBound,
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
      format = `${settings.day.format}, ${settings.date.format}`;
      break;
    case 'date':
      format = settings.date.format;
      break;
    case 'time':
      format = settings.time.format;
      break;
    case 'datetime':
      format = `${settings.date.format} ${settings.time.format}`;
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
      format = `${settings.date.format} ${settings.time.format}`;
      break;
    case 'date':
      format = settings.date.format;
      break;
    case 'time':
      format = settings.time.format;
      break;
  };
  return dayjs(new Date(...arr)).format(format);
};

function getCalendarCells(year, month) {
  const dayNum = new Date(year, month + 1, 0).getDate();
  const dayOfWeek = new Date(year, month, 1).getDay();

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

function getTodayTimestampBound() {
  const [year, month, day] = getArrayFromTimestamp(Date.now());
  return [new Date(year, month, day).getTime(), new Date(year, month, day + 1).getTime()];
};

function getMonthTimestampBound() {
  const [year, month] = getArrayFromTimestamp(Date.now());
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