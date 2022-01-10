import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Card.module.css';

export default function Card(props) {
  const {
    children,
    className,
    component: Tag = 'div',
    elevated = false,
    squared = false,
  } = props;

  const css = useStyles(styles);

  return (
    <Tag
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
  squared: PropTypes.bool,
};
