import {
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Clock.module.css';

import Button from '../Button';
const BTN_HEIGHT = 36;

export default function Clock(props) {
  const {
    className,
    onTimeChange,
    hour,
    minute,
  } = props;

  const ref1 = useRef();
  const ref2 = useRef();
  useEffect(() => {
    const hourCol = ref1.current;
    const minCol = ref2.current;
    hourCol.scrollTop = hour >= 3 ? (hour - 3) * BTN_HEIGHT : (21 + hour) * BTN_HEIGHT;
    minCol.scrollTop = minute >= 3 ? (minute - 3) * BTN_HEIGHT : (57 + minute) * BTN_HEIGHT;
    hourCol.addEventListener('scroll', scrollHandler);
    minCol.addEventListener('scroll', scrollHandler);
    return () => {
      hourCol.removeEventListener('scroll', scrollHandler);
      minCol.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  const css = useStyles(styles);

  const hours = [23, ...new Array(24).keys(), 0, 1, 2, 3, 4, 5, 6, 7, 8];
  const minutes = [59, ...new Array(60).keys(), 0, 1, 2, 3, 4, 5, 6, 7, 8];

  const scrollHandler = (e) => {
    const scrollPos = e.target.scrollTop;
    const scrollTotal = e.target.scrollHeight - e.target.offsetHeight;
    if (scrollPos === scrollTotal) {
      e.target.scrollTop = BTN_HEIGHT;
    } else if (scrollPos === 0) {
      e.target.scrollTop = scrollTotal - BTN_HEIGHT;
    }
  };

  return (
    <div className={css('container', className)}>
      <div className={css('col', 'no-scrollbar')} ref={ref1}>
        {hours.map((x, i) => (
          <Button
            tabIndex={-1}
            onClick={() => onTimeChange(x, minute)}
            variant={hour === x ? 'primary' : 'transparent'}
            className={css('btn')}
            key={i}
          >
            {x.toString().padStart(2, '0')}
          </Button>
        ))}
      </div>
      <div className={css('col', 'no-scrollbar')} ref={ref2}>
        {minutes.map((x, i) => (
          <Button
            tabIndex={-1}
            onClick={() => onTimeChange(hour, x)}
            variant={minute === x ? 'primary' : 'transparent'}
            className={css('btn')}
            key={i}
          >
            {x.toString().padStart(2, '0')}
          </Button>
        ))}
      </div>
    </div>
  );
}

Clock.propTypes = {
  className: PropTypes.string,
  onTimeChange: PropTypes.func,
  hour: PropTypes.number.isRequired,
  minute: PropTypes.number.isRequired,
};
