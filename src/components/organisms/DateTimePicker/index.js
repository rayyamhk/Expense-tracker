import { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './DateTimePicker.module.css';
import DateTime from '../../../utils/DateTime';

import TextField from '../../molecules/TextField';
import Button from '../../atoms/Button';
import Card from '../../atoms/Card';
import Calendar from '../../organisms/Calendar';
import Clock from '../../molecules/Clock';
import Icon from '../../atoms/Icon';

export default function DateTimePicker(props) {
  const {
    className,
    label,
    onDateTimeChange,
    year,
    month,
    day,
    hour,
    minute,
    settings,
  } = props;

  const [tab, setTab] = useState();
  const css = useStyles(styles);

  const toggle = () => setTab(tab ? null : 'date');
  const close = () => setTab(null);
  const dateTab = () => setTab('date');
  const timeTab = () => setTab('time');

  const onDateChange = (YYYY, MM, DD) => {
    onDateTimeChange(YYYY, MM, DD, hour, minute);
    timeTab();
  };

  const onTimeChange = (hh, mm) => {
    onDateTimeChange(year, month, day, hh, mm);
  };

  const classes = css(
    'container',
    tab && 'active',
    className,
  );

  const dateDisplay = DateTime.getStringFromArray([year, month, day, hour, minute], 'datetime', settings);

  return (
    <div className={classes}>
      <div onClick={close} className={css('hidden-overlay')} />
      <div onClick={toggle}>
        <TextField
          label={label}
          value={dateDisplay}
          id="date-picker"
          className={css('textfield')}
          disabled
        />
        <Icon icon="calendar_today" className={css('textfield-icon')} />
      </div>
      <Card elevated className={css('datetime-picker')}>
        <div className={css('tabs', tab === 'time' ? 'time-active' : 'date-active')}>
          <Calendar
            className={css('tab')}
            onDateChange={onDateChange}
            year={year}
            month={month}
            day={day}
          />
          <Clock
            className={css('tab')}
            onTimeChange={onTimeChange}
            hour={hour}
            minute={minute}
          />
        </div>
        <div className={css('tab-btns')}>
          <Button
            onClick={dateTab}
            variant={tab === 'date' ? 'contained' : 'transparent'}
            className={css('tab-btn')}
          >
            <Icon icon="date_range" />
          </Button>
          <Button
            onClick={timeTab}
            variant={tab === 'time' ? 'contained' : 'transparent'}
            className={css('tab-btn')}
          >
            <Icon icon="access_time" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

DateTimePicker.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  onDateTimeChange: PropTypes.func,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  hour: PropTypes.number.isRequired,
  minute: PropTypes.number.isRequired,
};
