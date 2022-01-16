import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Icon.module.css';

import icons from './icons';

export default function Icon(props) {
  const {
    backgroundColor,
    children,
    className,
    name,
  } = props;

  const css = useStyles(styles);
  const Tag = icons[name];

  if (icons[name]) {
    return (
      <div style={{ backgroundColor }} className={css('icon', className)}>
        <Tag />
      </div>
    );
  }

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
  name: PropTypes.string,
};
