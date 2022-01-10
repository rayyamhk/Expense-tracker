import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Icon.module.css';

export default function Icon(props) {
  const {
    backgroundColor,
    children,
    className,
  } = props;

  const css = useStyles(styles);

  return (
    <div
      style={{ backgroundColor }}
      className={css('icon', className)}
    >
      {children}
    </div>
  );
}

Icon.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};
