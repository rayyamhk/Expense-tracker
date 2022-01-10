import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MdCalendarToday,
  MdDateRange,
  MdAccessTime,
} from 'react-icons/md';
import TextField from '../../atoms/TextField';
import Button from '../../atoms/Button';
import Card from '../../atoms/Card';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import useStyles from '../../../hooks/useStyles';
import styles from './DateTimePicker.module.css';
import utils from '../DatePicker/utils';

export default function DateTimePicker(props) {
  const {
    className,
    datetime, // millisecond
    label,
    onDateTimeChange,
  } = props;

  const [date, time] = utils.getDateTime(datetime);
  const [tab, setTab] = useState();
  const css = useStyles(styles);

  const toggle = () => setTab(tab ? null : 'date');
  const close = () => setTab(null);
  const dateTab = () => setTab('date');
  const timeTab = () => setTab('time');

  const onDateChange = (yyyy, mm, dd) => {
    const newDate = utils.encodeDateString(yyyy, mm, dd);
    const dbTime = utils.getDatabaseTime(newDate, time);
    onDateTimeChange(dbTime);
    // timeTab();
  };

  const onTimeChange = (hh, mm) => {
    const newTime = utils.encodeTimeString(hh, mm);
    const dbTime = utils.getDatabaseTime(date, newTime);
    onDateTimeChange(dbTime);
    // close();
  };

  const classes = css(
    'container',
    tab && 'active',
    className,
  );

  return (
    <div className={classes}>
      <div onClick={close} className={css('hidden-overlay')} />
      <div onClick={toggle}>
        <TextField
          label={label}
          value={`${date} ${time}`}
          id="date-picker"
          className={css('textfield')}
          disabled
        />
        <MdCalendarToday className={css('textfield-icon')} />
      </div>
      <Card elevated className={css('datetime-picker')}>
        <div className={css('tabs', tab === 'time' ? 'time-active' : 'date-active')}>
          <DatePicker
            className={css('tab')}
            onDateChange={onDateChange}
            selected={date}
          />
          <TimePicker
            className={css('tab')}
            onTimeChange={onTimeChange}
            selected={time}
          />
        </div>
        <div className={css('tab-btns')}>
          <Button
            onClick={dateTab}
            variant={tab === 'date' ? 'primary' : 'transparent'}
            className={css('tab-btn')}
          >
            <MdDateRange />
          </Button>
          <Button
            onClick={timeTab}
            variant={tab === 'time' ? 'primary' : 'transparent'}
            className={css('tab-btn')}
          >
            <MdAccessTime />
          </Button>
        </div>
      </Card>
    </div>
  );
}

DateTimePicker.propTypes = {
  className: PropTypes.string,
  datetime: PropTypes.number.isRequired,
  label: PropTypes.string,
  onDateTimeChange: PropTypes.func,
};
