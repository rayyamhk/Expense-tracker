import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Paper.module.css';

export default function Paper(props) {
  const {
    children,
    className,
    component = 'div',
    elevated = false,
    rounded = false,
    themeMode = 'light'
  } = props;

  const css = useStyles(styles);
  const Tag = component;
  const classes = css(
    themeMode,
    elevated && 'elevated',
    rounded && 'rounded',
    className,
  );
  return <Tag className={classes}>{children}</Tag>;
};

Paper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  component: PropTypes.string,
  elevated: PropTypes.bool,
  rounded: PropTypes.bool,
  themeMode: PropTypes.bool,
};
