import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Switch.module.css';

export default function Switch(props) {
  const {
    checked = false,
    checkedIcon,
    className,
    uncheckedIcon,
    onChange,
  } = props;

  const css = useStyles(styles);

  return (
    <div className={css(className)} onClick={onChange}>
      <div className={css('wrapper')}>
        <span className={css('ball', checked && 'checked')}>{checked ? checkedIcon : uncheckedIcon}</span>
      </div>
    </div>
  )
};

Switch.propTypes = {
  checked: PropTypes.bool,
  checkedIcon: PropTypes.node,
  uncheckedIcon: PropTypes.node,
  onChange: PropTypes.func,
};
