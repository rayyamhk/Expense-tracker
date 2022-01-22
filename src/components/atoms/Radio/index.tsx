import PropTypes from 'prop-types';
import css, { prefix } from '../../../utils/css';
import Typography from '../Typography';

type RadioProps = {
  checked?: boolean,
  className?: string,
  label: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  value: string | number,
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Radio(props: RadioProps) {
  const {
    checked = false,
    className,
    label,
    onChange,
    value,
    ...rest
  } = props;

  const id = typeof value === 'string' ? value : value.toString();
  const radioClasses = css(
    "border border-solid border-on-surface-light rounded-full h-6 w-6 absolute-center",
    // prefix("before:", "bg-primary rounded scale-0 h-3.5 w-3.5 absolute-center transition-transform duration-75 ease-linear"),
    // prefix('after:', 'bg-on-primary rounded-full opacity-0 h-11 w-11 absolute-center'),
    // prefix("peer-checked:", "scale-100"),
    // "after:h-10 after:w-10 after:bg-success after:block after:absolute-center"
    // prefix('before:', 'bg-success-light h-10 w-10 absolute-center')
  )

  return (
    <div className="flex items-center relative">
      <div className="h-11 w-11 relative">
        <input
          type="radio"
          id={id}
          value={value}
          onChange={onChange}
          checked={checked}
          className="opacity-0 absolute-center w-5 h-5 peer"
          {...rest}
        />
        <span className={radioClasses} />
      </div>
      <Typography component="label" htmlFor={id}>{label}</Typography>
    </div>
  );
}

Radio.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};
