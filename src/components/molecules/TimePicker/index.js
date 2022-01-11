import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import useStyles from '../../../hooks/useStyles';
import styles from './TimePicker.module.css';
import utils from '../../../utils/DateTime';
const BTN_HEIGHT = 36;

export default function TimePicker(props) {
  const {
    className,
    onTimeChange,
    selected,
  } = props;

  const [hh, mm] = utils.decodeTimeString(selected);
  const ref1 = useRef();
  const ref2 = useRef();
  useEffect(() => {
    const hourCol = ref1.current;
    const minCol = ref2.current;
    hourCol.scrollTop = hh >= 3 ? (hh - 3) * BTN_HEIGHT : (21 + hh) * BTN_HEIGHT;
    minCol.scrollTop = mm >= 3 ? (mm - 3) * BTN_HEIGHT : (57 + mm) * BTN_HEIGHT;
    hourCol.addEventListener('scroll', scrollHandler);
    minCol.addEventListener('scroll', scrollHandler);
    return () => {
      hourCol.removeEventListener('scroll', scrollHandler);
      minCol.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  const css = useStyles(styles);

  const hours = [23, ...new Array(24).keys(), 0, 1, 2, 3, 4, 5, 6, 7];
  const minutes = [59, ...new Array(60).keys(), 0, 1, 2, 3, 4, 5, 6, 7];

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
      <div className={css('col')} ref={ref1}>
        {hours.map((x, i) => (
          <Button
            onClick={() => onTimeChange(x, mm)}
            variant={hh === x ? 'primary' : 'transparent'}
            className={css('btn')}
            key={i}
          >
            {x.toString().padStart(2, '0')}
          </Button>
        ))}
      </div>
      <div className={css('col')} ref={ref2}>
        {minutes.map((x, i) => (
          <Button
            onClick={() => onTimeChange(hh, x)}
            variant={mm === x ? 'primary' : 'transparent'}
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

TimePicker.propTypes = {
  className: PropTypes.string,
  onTimeChange: PropTypes.func,
  selected: PropTypes.string.isRequired,
};
