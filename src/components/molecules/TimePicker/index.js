import PropTypes from 'prop-types';
import Button from '../../atoms/Button';
import useStyles from '../../../hooks/useStyles';
import styles from './TimePicker.module.css';

export default function TimePicker(props) {
  const {
    className,
    onTimeChange,
    selected,
  } = props;

  const css = useStyles(styles);
  const hours = [...new Array(24).keys()];
  const minutes = [...new Array(60).keys()].map((x) => x + 1);

  console.log(hours)

  return (
    <div className={css('container', className)}>
      <div className={css('col')}>
        {hours.map((x) => <Button key={x}>{x.toString().padStart(2, '0')}</Button>)}
      </div>
      <div className={css('col')}>
        {minutes.map((x) => <Button key={x}>{x.toString().padStart(2, '0')}</Button>)}
      </div>
    </div>
  );
}

TimePicker.propTypes = {
  className: PropTypes.string,
  onTimeChange: PropTypes.func,
  selected: PropTypes.string.isRequired,
};
