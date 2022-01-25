import PropTypes from 'prop-types';
import css from '../../../utils/css';
import DateTime from '../../../utils/DateTime';
import SimpleCalendar from '../../molecules/SimpleCalendar';
import Typography from '../../atoms/Typography';
import IconButton from '../../atoms/IconButton';

export type CalendarProps = {
  className?: string,
  onDateChange?: (year: number, month: number, day: number) => void,
  year: number,
  month: number,
  day?: number,
  today?: [number, number, number],
}

export default function Calendar(props: CalendarProps) {
  const {
    className,
    onDateChange = () => {},
    year,
    month,
    day,
    today = [],
  } = props;

  const calendarHeadline = `${DateTime.translateMonth(month)} ${year}`;

  const prevMonth = () => {
    if (month === 0) {
      onDateChange(year - 1, 11, 1);
    } else {
      onDateChange(year, month - 1, 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      onDateChange(year + 1, 0, 1);
    } else {
      onDateChange(year, month + 1, 1);
    }
  };

  return (
    <div className={css('p-4 min-w-[20rem] rounded-lg bg-surface text-on-surface', className)}>
      <div className="mb-2 flex items-center">
        <Typography
          as="h6"
          variant="h6"
          className="flex-grow"
        >
          {calendarHeadline}
        </Typography>
        <IconButton
          icon="keyboard_arrow_left"
          onClick={prevMonth}
          size="sm"
          squared
          variant="transparent"
          className="mr-4"
          aria-label="Previous Month"
        />
        <IconButton
          icon="keyboard_arrow_right"
          onClick={nextMonth}
          size="sm"
          squared
          variant="transparent"
          aria-label="Next Month"
        />
      </div>
      <SimpleCalendar
        className="h-[calc(100%-32px)]"
        onDateChange={onDateChange}
        year={year}
        month={month}
        day={day}
        today={today}
      />
    </div>
  );
};

Calendar.propTypes = {
  onDateChange: PropTypes.func,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number,
  today: PropTypes.array,
};
