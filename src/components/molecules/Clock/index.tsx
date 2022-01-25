import {
  useEffect,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import css from '../../../utils/css';
import Button from '../../atoms/Button';

const hours = [23, ...new Array(24).keys(), 0, 1, 2, 3, 4, 5, 6, 7, 8];
const minutes = [59, ...new Array(60).keys(), 0, 1, 2, 3, 4, 5, 6, 7, 8];
const BTN_HEIGHT = 32;

export type ClockProps = {
  className?: string,
  onTimeChange?: (hour: number, minute: number) => void,
  hour?: number,
  minute?: number,
};

export default function Clock(props: ClockProps) {
  const {
    className,
    onTimeChange = () => {},
    hour,
    minute,
  } = props;

  const ref1 = useRef<HTMLDivElement>();
  const ref2 = useRef<HTMLDivElement>();

  useEffect(() => {
    const hourCol = ref1.current;
    const minCol = ref2.current;
    hourCol.scrollTop = hour >= 3 ? (hour - 3) * BTN_HEIGHT : (21 + hour) * BTN_HEIGHT;
    minCol.scrollTop = minute >= 3 ? (minute - 3) * BTN_HEIGHT : (57 + minute) * BTN_HEIGHT;
  }, []);

  const onScroll = (e: React.UIEvent<HTMLDivElement>): void => {
    const target = e.currentTarget;
    const scrollPos = Math.ceil(target.scrollTop);
    const scrollTotal = target.scrollHeight - target.offsetHeight;
    if (scrollPos === scrollTotal) {
      target.scrollTop = BTN_HEIGHT;
    } else if (scrollPos === 0) {
      target.scrollTop = scrollTotal - BTN_HEIGHT;
    }
  };

  const colClasses = 'w-1/2 h-full mx-1 overflow-y-scroll no-scrollbar';
  const btnClasses = 'text-xs h-8 w-full shadow-none';

  return (
    <div className={css('py-4 px-3 h-[20rem] flex overflow-y-hidden', className)}>
      <div className={colClasses} onScroll={onScroll} ref={ref1}>
        {hours.map((x, i) => (
          <Button
            tabIndex={-1}
            onClick={() => onTimeChange(x, minute)}
            variant={hour === x ? 'contained' : 'transparent'}
            size="sm"
            className={btnClasses}
            key={i}
          >
            {x.toString().padStart(2, '0')}
          </Button>
        ))}
      </div>
      <div className={colClasses} onScroll={onScroll} ref={ref2}>
        {minutes.map((x, i) => (
          <Button
            tabIndex={-1}
            onClick={() => onTimeChange(hour, x)}
            variant={minute === x ? 'contained' : 'transparent'}
            size="sm"
            className={btnClasses}
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
