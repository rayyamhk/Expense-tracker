import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Progress.module.css';

export default function Progress(props) {
  const {
    value = 0,
    variant = 'primary',
    max = 100,
  } = props;

  const css = useStyles(styles);

  return (
    <div className={css('wrapper', variant)}>
      <span
        className={css('bar')}
        style={{ width: `${100*value/max}%` }}
      />
    </div>
  );
}

Progress.propTypes = {
  value: PropTypes.number,
  variant: PropTypes.oneOf(['primary', 'error']),
  max: PropTypes.number,
};
