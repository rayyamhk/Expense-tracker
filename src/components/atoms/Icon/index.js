import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Icon.module.css';

import Image from 'next/image';
import configs from './configs';

export default function Icon(props) {
  const {
    className,
    color,
    icon,
    iconType = 'material_icons',
  } = props;

  const css = useStyles(styles);

  if (iconType === 'material_icons') {
    return <span className={css(className, 'icon', 'material-icons')} style={{ color }}>{icon}</span>;
  }

  if (iconType === 'svg') {
    return <Image src={`/${icon}.svg`} alt={icon} {...configs[icon]} />;
  }

  return <Image src={`/${icon}.jpg`} alt={icon} {...configs[icon]} />;
}

Icon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(['material_icons', 'svg', 'img']),
};
