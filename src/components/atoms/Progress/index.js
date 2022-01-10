import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Progress.module.css';

export default function Progress(props) {
  const {
    value,
    max,
  } = props;

  const css = useStyles(styles);

  return (
    <div className={css('wrapper')}>
      <span
        className={css('bar')}
        style={{ width: `${100*value/max}%` }}
      />
    </div>
  );
}

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};
