import { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './DatePicker.module.css';
import DateTime from '../../../utils/DateTime';

import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import Button from '../../atoms/Button';

export default function DatePicker(props) {
  const {
    className,
    onDateChange,
    year,
    month,
    day,
  } = props;

  const [activeYear, setActiveYear] = useState(year);
  const [activeMonth, setActiveMonth] = useState(month);
  const css = useStyles(styles);

  const calendarCells = DateTime.getCalendarCells(activeYear, activeMonth);
  const calendarHeadline = `${DateTime.translateMonth(activeMonth)} ${activeYear}`;

  const nextMonth= () => {
    if (activeMonth === 11) {
      setActiveMonth(0);
      setActiveYear(activeYear + 1);
    } else {
      setActiveMonth(activeMonth + 1);
    }
  };

  const prevMonth= () => {
    if (activeMonth === 0) {
      setActiveMonth(11);
      setActiveYear(activeYear - 1);
    } else {
      setActiveMonth(activeMonth - 1);
    }
  };

  return (
    <div className={css('container', className)}>
      <div className={css('calendar-control')}>
        <span className={css('year-select')}>
          {calendarHeadline}
        </span>
        <span className={css('flex-expand')} />
        <Button
          onClick={prevMonth}
          variant="transparent"
          className={css('arrow')}
        >
          <MdKeyboardArrowLeft />
        </Button>
        <Button
          onClick={nextMonth}
          variant="transparent"
          className={css('arrow')}
        >
          <MdKeyboardArrowRight />
        </Button>
      </div>
      <table role="grid" className={css('calendar')}>
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader" aria-label="Sunday">S</th>
            <th role="columnheader" aria-label="Monday">M</th>
            <th role="columnheader" aria-label="Tuesday">T</th>
            <th role="columnheader" aria-label="Wednesday">W</th>
            <th role="columnheader" aria-label="Thursday">T</th>
            <th role="columnheader" aria-label="Friday">F</th>
            <th role="columnheader" aria-label="Saturday">S</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          {calendarCells.map((row, i) => (
            <tr role="row" key={i}>
              {row.map((x, j) => {
                if (x) {
                  return (
                    <td
                      role="gridcell"
                      tabIndex={-1}
                      key={j}
                    >
                      <Button
                        onClick={() => onDateChange(activeYear, activeMonth, x)}
                        variant={activeYear === year && activeMonth === month && day === x ? 'primary' : 'transparent'}
                      >
                        {x}
                      </Button>
                    </td>
                  );
                }
                return <td key={j}></td>
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

DatePicker.propTypes = {
  className: PropTypes.string,
  onDateChange: PropTypes.func,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
};
