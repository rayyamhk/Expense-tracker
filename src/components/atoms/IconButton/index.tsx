import PropTypes from 'prop-types';
import css from '../../../utils/css';
import Button, { ButtonProps } from '../Button';
import Icon from '../Icon';

export type IconButtonProps = {
  className?: string,
  icon: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl',
  squared?: boolean,
  variant?: 'contained' | 'outlined' | 'transparent',
} & ButtonProps;

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
    icon,
    onClick,
    size = 'md',
    squared = false,
    variant = 'contained',
    ...rest
  } = props;

  const classes = css(
    'center',
    sizes[size],
    !squared && 'rounded-full',
    className,
  );

  return (
    <Button
      className={classes}
      variant={variant}
      size="xs"
      onClick={onClick}
    >
      <Icon icon={icon} size={size} {...rest} />
    </Button>
  );
};

IconButton.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  squared: PropTypes.bool,
  variant: PropTypes.oneOf(['contained', 'outlined', 'transparent']),
};
