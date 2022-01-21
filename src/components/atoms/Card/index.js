import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Card.module.css';

export default function Card(props) {
  const {
    children,
    className,
    component: Tag = 'div',
    elevation = 0,
    onClick,
    overflow = false,
    squared = false,
    ...componentProps
  } = props;

  const css = useStyles(styles);

  return (
    <Tag
      onClick={onClick}
      className={css(
        `elevation-${elevation}`,
        !squared && 'round',
        !overflow && 'overflow-hidden',
        className
      )}
      {...componentProps}
    >
      {children}
    </Tag>
  );
}

Card.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  elevation: PropTypes.number,
  onClick: PropTypes.func,
  overflow: PropTypes.bool,
  squared: PropTypes.bool,
};
