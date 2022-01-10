import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdArrowDropDown,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from 'react-icons/md';
import Button from '../../atoms/Button';
import useStyles from '../../../hooks/useStyles';
import styles from './DatePicker.module.css';
import utils from './utils';

export default function DatePicker(props) {
  const {
    className,
    onDateChange,
    selected,
  } = props;

  const [MM, DD, YYYY] = utils.decodeDateString(selected);
  const [month, setMonth] = useState(MM);
  const [year, setYear] = useState(YYYY);
  const css = useStyles(styles);

  const calendarCells = utils.getCalendarCells(year, month);

  const nextMonth= () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  const prevMonth= () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  return (
    <div className={css('container', className)}>
      <div className={css('calendar-control')}>
        <Button
          variant="transparent"
          className={css('year-select')}
        >
          {`${utils.translateMonth(month)} ${year}`}
          <MdArrowDropDown />
        </Button>
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
              {row.map((day, i) => {
                if (day) {
                  return (
                    <td
                      role="gridcell"
                      tabIndex={-1}
                      key={i}
                    >
                      <Button
                        onClick={() => onDateChange(year, month, day)}
                        variant={year === YYYY && month === MM && DD === day ? 'primary' : 'transparent'}
                      >
                        {day}
                      </Button>
                    </td>
                  );
                }
                return <td key={i}></td>
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
  selected: PropTypes.string.isRequired,
};
