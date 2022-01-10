import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Typography.module.css';

const variantMapping = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  body: 'p',
  captionText: 'span',
};

export default function Typography(props) {
  const {
    children,
    className,
    component,
    color,
    variant = 'body',
    weight,
    ...componentProps
  } = props;

  const css = useStyles(styles);
  const Tag = component || variantMapping[variant];

  const classes = [variant, className];
  if (color) {
    classes.push(`color-${color}`);
  }
  if (weight) {
    classes.push(`weight-${weight}`);
  }

  return (
    <Tag className={css(...classes)} {...componentProps}>{children}</Tag>
  );
}

Typography.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  color: PropTypes.oneOf([300, 500, 900]),
  variant: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'body', 'captionText']),
  weight: PropTypes.oneOf([300, 400, 700]),
};
