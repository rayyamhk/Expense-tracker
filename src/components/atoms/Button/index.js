import PropTypes from 'prop-types';
import Link from '../Link';
import useStyles from '../../../hooks/useStyles';
import styles from './Button.module.css';

export default function Button(props) {
  const {
    children,
    className,
    float = false,
    href,
    onClick,
    shadow = false,
    shape = 'squae',
    size = 'small',
    variant = 'primary',
    ...remainingProps
  } = props;

  const css = useStyles(styles);

  let Tag;

  const componentProps = {
    className: css(
      'btn',
      'no-tab',
      'click-effect',
      variant,
      shape,
      size,
      shadow && 'shadow',
      float && 'float',
      className
    ),
    ...remainingProps,
  };

  if (href) {
    Tag = Link;
    componentProps.href = href;
  } else {
    Tag = 'button';
    componentProps.onClick = onClick;
  }
  return (
    <Tag {...componentProps}>{children}</Tag>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  float: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  shadow: PropTypes.bool,
  shape: PropTypes.oneOf(['square', 'round', 'circle']),
  size: PropTypes.oneOf(['small', 'large']),
  variant: PropTypes.oneOf(['primary', 'success', 'error', 'transparent']),
};
