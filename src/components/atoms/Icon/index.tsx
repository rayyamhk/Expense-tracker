import PropTypes from 'prop-types';
import css from '../../../utils/css';
import getDimensions from './getDimensions';
import Image from 'next/image';

export type IconProps = {
  className?: string,
  color?: string,
  icon: string,
  iconType?: 'material_icons' | 'jpg' | 'png' | 'svg',
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
};

const sizes = {
  xs: 'text-base',
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
  xl: 'text-5xl',
};

export default function Icon(props: IconProps) {
  const {
    className,
    color,
    icon,
    iconType = 'material_icons',
    size = 'md',
  } = props;

  if (iconType === 'material_icons') {
    const classes = css(
      'material-icons',
      'no-select',
      sizes[size],
      className,
    );
    return (
      <span className={css(classes)} style={{ color }}>
        {icon}
      </span>
    );
  }

  const configs = getDimensions(size);

  return <Image src={`/${icon}.${iconType}`} alt={icon} {...configs[icon]} />;
};

Icon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(['material_icons', 'svg', 'img']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
};
