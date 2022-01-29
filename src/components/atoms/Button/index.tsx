import PropTypes from 'prop-types';
import css from '../../../utils/css';
import Link, { LinkProps } from '../Link';

export type ButtonProps = {
  children?: React.ReactNode,
  className?: string,
  color?: 'primary' | 'success' | 'error',
  href?: string,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
  size?: 'xs' | 'sm' | 'md' | 'lg',
  variant?: 'contained' | 'outlined' | 'transparent',
} & React.ComponentPropsWithoutRef<'button'> & LinkProps;

const sizes = {
  xs: 'px-1 py-1',
  sm: 'px-2 py-2',
  md: 'px-4 py-2.5',
  lg: 'px-6 py-3',
};

const colors = {
  contained: {
    primary: 'text-on-primary bg-primary border-primary',
    error: 'text-on-error bg-error border-error',
    success: 'text-on-success bg-success border-success',
  },
  outlined: {
    primary: 'text-primary bg-transparent border-primary shadow-none',
    error: 'text-error bg-transparent border-error shadow-none',
    success: 'text-success bg-transparent border-success shadow-none',
  },
  transparent: 'text-inherit bg-transparent border-transparent shadow-none',
};

export default function Button(props: ButtonProps) {
  const {
    children,
    className,
    color = 'primary',
    href,
    onClick,
    size = 'md',
    variant = 'contained',
    ...rest
  } = props;

  console.log(variant, colors[variant])

  const classes = css(
    'base-btn',
    typeof colors[variant] === 'string' ? colors[variant] : colors[variant][color],
    sizes[size],
    className
  );

  if (href) {
    return <Link href={href} className={classes} {...rest}>{children}</Link>;
  };

  return <button onClick={onClick} className={classes} {...rest}>{children}</button>;
};

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'error', 'success']),
  href: PropTypes.string,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  variant: PropTypes.oneOf(['contained', 'outlined', 'transparent']),
};
