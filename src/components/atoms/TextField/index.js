import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './TextField.module.css';

export default function TextField(props) {
  const {
    className,
    error = false,
    id,
    label,
    nextFocus,
    onChange,
    type = 'text',
    value = '',
    ...inputProps
  } = props;
  const css = useStyles(styles);

  const classes = css(
    'textfield-container',
    type === 'textarea' && 'textarea',
    value && 'contained',
    error && 'error',
    className,
  );

  const onPress = (e) => {
    if (nextFocus && e.key === 'Enter') {
      e.preventDefault();
      const next = document.getElementById(nextFocus);
      next && next.focus();
    }
  };

  const Tag = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={classes}>
      <Tag
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onPress}
        id={id}
        className={css('input')}
        autoComplete="off"
        {...inputProps}
      />
       <label
        htmlFor={id}
        className={css('label')}
      >
        {label}
      </label>
      <fieldset className={css('fieldset')}>
        <legend className={css('legend')}>{label}</legend>
      </fieldset>
    </div>
  );
}

TextField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  nextFocus: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'textarea', 'number', 'password']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
