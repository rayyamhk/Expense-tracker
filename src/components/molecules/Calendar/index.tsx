import React from 'react';
import PropTypes from 'prop-types';
import css, { prefix } from '../../../utils/css';
import DateTime from '../../../utils/DateTime';
import Typography from '../../atoms/Typography';
import Button from '../../atoms/Button';

export type SimpleCalendarProps = {
  className?: string,
  onDateChange?: (year: number, month: number, day: number) => void,
  year: number,
  month: number,
  day?: number,
  today?: [number, number, number] | [],
};

export default function SimpleCalendar(props: SimpleCalendarProps) {
  const {
    className,
    onDateChange = () => {},
    year,
    month,
    day,
    today = [],
  } = props;

  const calendarCells = DateTime.getCalendarCells(year, month);
  const ariaLabel = `${DateTime.translateMonth(month)} ${year}`;

  return (
    <table
      role="grid"
      aria-label={ariaLabel}
      className={css('table-fixed w-full bg-surface text-on-surface', className)}
    >
      <thead>
        <tr>
          <Typography as="th" align="center" className="p-1" aria-label="Sunday">S</Typography>
          <Typography as="th" align="center" className="p-1" aria-label="Monday">M</Typography>
          <Typography as="th" align="center" className="p-1" aria-label="Tuesday">T</Typography>
          <Typography as="th" align="center" className="p-1" aria-label="Wednesday">W</Typography>
          <Typography as="th" align="center" className="p-1" aria-label="Thursday">T</Typography>
          <Typography as="th" align="center" className="p-1" aria-label="Friday">F</Typography>
          <Typography as="th" align="center" className="p-1" aria-label="Saturday">S</Typography>
        </tr>
      </thead>
      <tbody>
        {calendarCells.map((row, i) => (
          <tr key={i}>
            {row.map(({ current, day: x }, j) => (
              <td key={j}>
                <Button
                  tabIndex={-1}
                  onClick={() => onDateChange(year, month, x)}
                  variant="transparent"
                  size="sm"
                  className={css(
                    'text-xs w-full h-full min-h-[2rem] relative z-10 shadow-none',
                    current && x === day && 'outline outline-2 rounded outline-primary',
                    current && today[0] === year && today[1] === month && today[2] === x &&
                    prefix('before:', 'w-5 h-5 rounded-full bg-primary absolute-center -z-10')
                  )}
                  disabled={!current}
                >
                  {x}
                </Button>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

SimpleCalendar.propTypes = {
  className: PropTypes.string,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number,
  today: PropTypes.array,
};
