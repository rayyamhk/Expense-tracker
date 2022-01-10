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
  1: 'January',
  2: 'February',
  3: 'March',
  4: 'April',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'August',
  9: 'September',
  10: 'October',
  11: 'November',
  12: 'December',
};

const dayNames = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const utils = {
  encodeDateString: (YYYY, MM, DD) => {
    DD = DD.toString().padStart(2, '0');
    MM = MM.toString().padStart(2, '0');
    return `${MM}/${DD}/${YYYY}`;
  },
  encodeTimeString: (hh, mm) => {
    hh = hh.toString().padStart(2, '0');
    mm = mm.toString().padStart(2, '0');
    return `${hh}:${mm}`;
  },
  decodeDateString: (str) => str.split('/').map((str) => parseInt(str)),
  decodeTimeString: (str) => str.split(':').map((str) => parseInt(str)),
  getCalendarCells: (year, month) => {
    const [daysOfWeek, dayNum] = getCalendarInfo(year, month);
    const cells = [];
    const cellNum = Math.ceil((daysOfWeek + dayNum) / 7) * 7;
    let row;
    for (let i = 0; i < cellNum; i++) {
      if (i % 7 === 0) {
        row = [];
      }
      if (i < daysOfWeek || i > daysOfWeek + dayNum - 1) {
        row.push(null);
      } else {
        row.push(i - daysOfWeek + 1);
      }
      if (i % 7 === 6) {
        cells.push(row);
      }
    }
    return cells;
  },
  getDatabaseTime: (date, time) => {
    return new Date(`${date} ${time}`).getTime();
  },
  getDateTime: (millisecond) => {
    const now = new Date(millisecond);
    const YYYY = now.getFullYear();
    const MM = (now.getMonth() + 1).toString().padStart(2, '0');
    const DD = now.getDate().toString().padStart(2, '0');
    const hh = now.getHours().toString().padStart(2, '0');
    const mm = now.getMinutes().toString().padStart(2, '0');
    const date = `${MM}/${DD}/${YYYY}`;
    const time = `${hh}:${mm}`;
    return [date, time];
  },
  translateDay: (day) => dayNames[day],
  translateMonth: (month) => monthNames[month],
};

export default utils;

// baseline: 2000-01-01
function daysBetween(yyyy, mm, dd) {
  const table = {
    1: 0,
    2: 31,
    3: 59,
    4: 90,
    5: 120,
    6: 151,
    7: 181,
    8: 212,
    9: 243,
    10: 273,
    11: 304,
    12: 334,
  };
  return (yyyy - 2000) * 365 + Math.ceil((yyyy - 2000) / 4) + table[mm] + (dd - 1);
}

function getCalendarInfo(year, month) {
  const days = daysBetween(year, month, 1);
  const daysOfWeek = (days + 6) % 7; // + 6 because 2000-01-01 is Sat
  if (year % 4 === 0 && month === 2) {
    return [daysOfWeek, 29];
  }
  return [daysOfWeek, monthDaysMapping[month]];
};
