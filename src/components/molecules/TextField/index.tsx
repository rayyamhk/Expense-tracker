import PropTypes from 'prop-types';
import css, { prefix } from '../../../utils/css';
import Typography from '../../atoms/Typography';

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

  const Tag = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className={css('min-w-[12rem] relative z-10', className)}>
      <Tag
        type={type}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        id={id}
        autoComplete="off"
        className="
          peer bg-transparent base-text text-normal text-sm text-on-surface
          w-full p-4 resize-none focus:outline-none
        "
        {...rest}
      />
      <Typography
        as="label"
        variant="caption"
        htmlFor={id}
        className={css(
          'absolute top-[-0.47rem] left-3.5 peer-focus:text-primary',
          error && !value ? 'text-error' : 'text-on-surface-light',
        )}
      >
        &#8203;{label}
      </Typography>
      <fieldset className={css(
        'rounded pointer-events-none',
        'absolute inset-0 top-[-0.47rem]',
        prefix('peer-focus:', 'border-2 border-primary'),
        label && 'px-2',
        error && !value ? 'border-2 border-error' : 'border border-on-surface-light',
      )}>
        <Typography
          as="legend"
          variant="caption"
          className={css('invisible', label && 'px-1')}
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
