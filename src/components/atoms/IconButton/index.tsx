import PropTypes from 'prop-types';
import css from '../../../utils/css';
import { IconType } from '../../../types';
import Button, { ButtonProps } from '../Button';
import Icon from '../Icon';

export type IconButtonProps = {
  className?: string,
  color?: string,
  icon: string,
  iconType?: IconType,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  squared?: boolean,
  variant?: 'contained' | 'outlined' | 'transparent',
} & Omit<ButtonProps, 'size'>;

const sizes = {
  'xs': 'w-6 h-6',
  'sm': 'w-8 h-8',
  'md': 'w-10 h-10',
  'lg': 'w-12 h-12',
  'xl': 'w-14 h-14',
};

export default function IconButton(props: IconButtonProps) {
  const {
    className,
    color,
    icon,
    iconType,
    onClick,
    size = 'md',
    squared = false,
    variant = 'contained',
    ...rest
  } = props;

  const classes = css(
    'center',
    sizes[size],
    !squared && 'rounded-full after:rounded-full',
    className,
  );

  const iconSize = ['md', 'lg', 'xl'].includes(size) ? 'md' : size;

  return (
    <Button
      className={classes}
      variant={variant}
      size="xs"
      onClick={onClick}
      {...rest}
    >
      <Icon icon={icon} iconType={iconType} color={color} size={iconSize} />
    </Button>
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.string.isRequired,
  iconType: PropTypes.oneOf(['material_icon', 'jpg', 'png', 'svg']),
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  squared: PropTypes.bool,
  variant: PropTypes.oneOf(['contained', 'outlined', 'transparent']),
};
