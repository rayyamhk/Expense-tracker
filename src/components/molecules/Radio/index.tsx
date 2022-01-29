import PropTypes from 'prop-types';
import css, { prefix } from '../../../utils/css';
import Typography from '../../atoms/Typography';

export type RadioProps = {
  checked?: boolean,
  className?: string,
  id: string,
  label: string,
  onChange?: (value: string | number) => void,
  value: string | number,
} & Omit<React.ComponentPropsWithoutRef<'input'>, 'onChange'>;

export default function Radio(props: RadioProps) {
  const {
    checked = false,
    className,
    id,
    label,
    onChange,
    value,
    ...rest
  } = props;

  const containerClasses = css('flex items-center z-10', className);

  const radioClasses = css(
    'border border-solid border-on-surface-light rounded-full h-6 w-6 absolute-center -z-10',
    'peer-checked:after:scale-100 group-hover:before:opacity-10 focus:before:opacity-10 focus:outline-none',
    prefix('before:', 'bg-on-primary rounded-full h-10 w-10 absolute-center transition-opacity opacity-0'),
    prefix('after:', 'bg-primary rounded-full h-3 w-3 absolute-center transition-transform scale-0'),
  );

  return (
    <div className={containerClasses}>
      <div className="group h-10 w-10 relative">
        <input
          tabIndex={-1}
          type="radio"
          id={id}
          value={value}
          onChange={() => onChange(value)}
          checked={checked}
          className="peer opacity-0 h-10 w-10 absolute-center cursor-pointer"
          {...rest}
        />
        <span
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onChange(value)}
          className={radioClasses}
        />
      </div>
      <Typography
        as="label"
        htmlFor={id}
        className="pl-1 cursor-pointer"
      >
        {label}
      </Typography>
    </div>
  );
};

Radio.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string.isRequired,
};
