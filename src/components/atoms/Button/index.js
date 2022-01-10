import PropTypes from 'prop-types';
import Link from '../Link';
import useStyles from '../../../hooks/useStyles';
import styles from './Button.module.css';

export default function Button(props) {
  const {
    children,
    className,
    href,
    onClick,
    variant = 'primary',
    ...remainingProps
  } = props;

  const css = useStyles(styles);

  let Tag;

  const componentProps = {
    className: css('btn', variant, className),
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
  href: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(['primary', 'transparent']),
};
