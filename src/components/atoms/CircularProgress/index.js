import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './CircularProgress.module.css';

export default function CircularProgress(props) {
  const {
    className,
  } = props;

  const css = useStyles(styles);

  return (
    <div className={css('wrapper', className)}>
      <svg viewBox='22 22 44 44'>
        <circle cx='44' cy='44' r='20.2' fill='none' strokeWidth='3.6' className={css('circle')} />
      </svg>
    </div>
  );
}

CircularProgress.propTypes = {
  className: PropTypes.string,
};
