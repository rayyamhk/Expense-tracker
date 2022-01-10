import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Radio.module.css';

export default function Radio(props) {
  const {
    checked = false,
    className,
    id,
    label,
    name,
    onChange,
    value,
  } = props;

  const css = useStyles(styles);

  return (
    <div className={css('container', className)}>
      <span className={css('radio-wrapper')}>
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
          className={css('radio')}
        />
        <span className={css('fake-radio')} />
      </span>
      <label htmlFor={id} className={css('label')}>{label}</label>
    </div>
  );
}

Radio.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};
