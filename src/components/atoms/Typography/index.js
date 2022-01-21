import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Typography.module.css';

export default function Typography(props) {
  const {
    align = 'left',
    children,
    className,
    component = 'p',
    italic = false,
    nowrap = false,
    variant = 'body',
    ...rest
  } = props;

  const css = useStyles(styles);
  const Tag = component;

  return (
    <Tag
      className={css(
        'typography',
        align,
        italic && 'italic',
        nowrap && 'nowrap',
        variant,
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};

const variant = PropTypes.oneOf([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'body',
  'caption',
]);

Typography.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  italic: PropTypes.bool,
  variant,
};
