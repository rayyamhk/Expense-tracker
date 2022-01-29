import PropTypes from 'prop-types';
import css from '../../../utils/css';
import Icon from '../Icon';

export type SwitchProps = {
  checked?: boolean,
  className?: string,
  onChange?: (checked: boolean) => void,
}

export default function Switch(props: SwitchProps) {
  const {
    checked = false,
    className,
    onChange,
  } = props;

  const ballClasses = css(
    'bg-black h-7 w-7 rounded-full center',
    'absolute left-0 top-1/2',
    'translate-x-0 -translate-y-1/2 transition-transform',
    checked && 'translate-x-3'
  );

  return (
    <div className={className}>
      <div
        className="w-10 h-5 rounded-xl relative bg-on-surface"
        onClick={() => onChange(!checked)}
      >
        <span className={ballClasses}>
          <Icon icon={checked ? 'dark_mode' : 'light_mode'} size="xs" color="#FFFFFF" />
        </span>
      </div>
    </div>
  )
};

Switch.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
};
