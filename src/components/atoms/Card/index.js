import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Card.module.css';

export default function Card(props) {
  const {
    children,
    className,
    component: Tag = 'div',
    elevated = false,
    onClick,
    squared = false,
  } = props;

  const css = useStyles(styles);

  return (
    <Tag
      onClick={onClick}
      className={css(
        'container',
        elevated && 'elevated',
        !squared && 'round',
        className
      )}
    >
      {children}
    </Tag>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  elevated: PropTypes.bool,
  onClick: PropTypes.func,
  squared: PropTypes.bool,
};
