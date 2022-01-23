import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css, { prefix } from '../../../utils/css';
import Card from '../Card';
import Icon from '../Icon';
import Typography from '../Typography';

type option = {
  id: string,
  value: string,
  [key:string]: string,
};

export type SelectProps = {
  className?: string,
  error?: boolean,
  label?: string,
  onSelect?: (id: string) => void,
  options?: option[],
  selected?: option,
};

export default function Select(props: SelectProps) {
  const {
    className,
    error = false,
    label,
    onSelect,
    options,
    selected,
  } = props;

  const [active, setActive] = useState(false);

  const onToggle = () => setActive(!active);
  const onClose = () => setActive(false);
  const labelClasses = css(
    'text-on-surface-light',
    'absolute top-[-0.47rem] left-4 peer-focus:text-primary',
  );
  const fieldsetClasses = css(
    'border border-on-surface-light',
    'rounded pointer-events-none',
    'absolute inset-0 top-[-0.47rem]',
    label && 'px-2',
    // prefix('peer-focus:', 'border-2 border-primary'),
  );
  const legendClasses = css('invisible', label && 'px-2'); // allow to render without labels

  return (
    <div className={'relative min-w-[8rem] ' + className}>
      <div onClick={onToggle} className="relative flex items-center">
        <Typography
          nowrap
          component="div"
          className="p-4 text-on-surface flex-grow no-select"
        >
          &#8203;{selected?.value}
        </Typography>
        <Icon icon="arrow_drop_down" size="sm" className={`mr-1 ${active && 'rotate-180'} transition-transform`} />
        <Typography
          nowrap
          component="label"
          variant="caption"
          className={labelClasses}
        >
          &#8203;{label}
        </Typography>
        <fieldset className={fieldsetClasses}>
          <Typography
            nowrap
            component="legend"
            variant="caption"
            className={legendClasses}
          >
            {label}
          </Typography>
        </fieldset>
      </div>
        {options.length > 0 && active && (
          <Card
            component="ul"
            elevation={2}
            className="px-0 bg-surface overflow-y-scroll no-scrollbar max-h-[19.5rem] absolute z-20 w-full"
          >
            {options.map(({ id, value, icon, ...rest }) => (
              <Typography
                component="li"
                nowrap
                onClick={() => {
                  onSelect(id);
                  onClose();
                }}
                className={css('btn-effect h-14 w-full py-2 px-6 inline-flex items-center no-select')}
                key={id}
              >
                {icon && <Icon className={css('icon')} icon={icon} {...rest} />}
                {value}
              </Typography>
            ))}
          </Card>
        )}
    </div>
  );
}

const optionType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
});

Select.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(optionType),
  selected: optionType,
};
