import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Icon.module.css';

import Image from 'next/image';
import configs from './configs';

export default function Icon(props) {
  const {
    className,
    icon,
    iconType = 'material_icons',
    color,
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
  color: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
  name: PropTypes.string,
};
