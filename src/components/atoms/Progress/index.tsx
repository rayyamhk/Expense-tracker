import PropTypes from 'prop-types';
import css, { prefix } from '../../../utils/css';

export type ProgressProps = {
  className?: string,
  value?: number,
  variant?: 'primary' | 'error',
  max?: number,
};

const colors = {
  primary: 'bg-primary',
  error: 'bg-error-light',
};

export default function Progress(props: ProgressProps) {
  const {
    className,
    value = 0,
    variant = 'primary',
    max = 100,
  } = props;

  const classes = css(
    'h-full',
    colors[variant],
    prefix('after:', 'block w-full h-full origin-right bg-slate-100 animate-progress'),
  );

  return (
    <div className={css('w-full h-2 rounded overflow-hidden bg-slate-100', className)}>
      <div
        className={classes}
        style={{ width: `${100 * value / max}%` }}
      />
    </div>
  );
}

Progress.propTypes = {
  value: PropTypes.number,
  variant: PropTypes.oneOf(['primary', 'error']),
  max: PropTypes.number,
};
