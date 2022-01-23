import PropTypes from 'prop-types';
import css, { prefix } from '../../../utils/css';
import Typography from '../Typography';

export type TextFieldProps = {
  className?: string,
  error?: boolean,
  id: string,
  label?: string,
  next?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
  type?: 'text' | 'textarea' | 'number' | 'password',
  value?: string,
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export default function TextField(props: TextFieldProps) {
  const {
    className,
    error = false,
    id,
    label,
    next,
    onChange,
    type = 'text',
    value = '',
    ...rest
  } = props;

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    if (next && e.key === 'Enter') {
      e.preventDefault();
      const el = document.getElementById(next);
      el && el.focus();
    }
  };

  const containerClasses = css('relative z-10', className);
  const labelClasses = css(
    'absolute top-[-0.47rem] left-4 peer-focus:text-primary',
    error && !value ? 'text-error' : 'text-on-surface-light',
  );
  const fieldsetClasses = css(
    'rounded pointer-events-none',
    'absolute inset-0 top-[-0.47rem]',
    label && 'px-2',
    error && !value ? 'border-2 border-error' : 'border border-on-surface-light',
    prefix('peer-focus:', 'border-2 border-primary'),
  );
  const legendClasses = css('invisible', label && 'px-2'); // allow to render without labels

  const Tag = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={containerClasses}>
      <Tag
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        id={id}
        autoComplete="off"
        className="
          peer base-text text-normal text-sm text-on-surface
          w-full p-4 resize-none focus:outline-none
        "
        {...rest}
      />
      <Typography
        component="label"
        variant="caption"
        htmlFor={id}
        className={labelClasses}
      >
        &#8203;{label}
      </Typography>
      <fieldset className={fieldsetClasses}>
        <Typography
          component="legend"
          variant="caption"
          className={legendClasses}
        >
          &#8203;{label}
        </Typography>
      </fieldset>
    </div>
  );
};

TextField.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  next: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['text', 'textarea', 'number', 'password']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
