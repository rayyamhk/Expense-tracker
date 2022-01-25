import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../../../utils/css';
import { SelectedItem } from '../../../types';
import Card from '../../atoms/Card';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';

export type SelectProps = {
  className?: string,
  error?: boolean,
  label?: string,
  onSelect?: (id: string) => void,
  options?: SelectedItem[],
  selected?: SelectedItem,
};

export default function Select(props: SelectProps) {
  const {
    className,
    error = false,
    label,
    onSelect: handleSelect,
    options = [],
    selected,
  } = props;

  const [active, setActive] = useState(false);
  const onToggle = () => setActive(!active);
  const onClose = () => setActive(false);
  const onSelect = (id: string) => {
    return () => {
      handleSelect(id);
      onClose();
    };
  };

  return (
    <div className={css('min-w-[8rem] relative', className)}>
      <div
        onClick={onClose}
        className={css(
          'fixed inset-0 w-screen h-screen',
          active ? 'z-20' : 'hidden',
        )}
      />
      <div
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onToggle()}
        onClick={onToggle}
        className="
          relative z-20 flex items-center cursor-pointer
          group focus:outline-none
        "
      >
        <Typography
          nowrap
          as="div"
          className="text-on-surface p-4 flex-grow no-select"
        >
          &#8203;{selected?.value}
        </Typography>
        <Icon
          icon="arrow_drop_down"
          size="sm"
          className={css('mr-1 transition-transform', active && 'rotate-180')}
        />
        <Typography
          nowrap
          as="label"
          variant="caption"
          className={css(
            'absolute top-[-0.47rem] left-3.5 group-focus:text-primary',
            active ? 'text-primary' : error ? 'text-error' : 'text-on-surface-light',
          )}
        >
          &#8203;{label}
        </Typography>
        <fieldset className={css(
          'rounded pointer-events-none absolute inset-0 top-[-0.47rem] group-focus:border-2 group-focus:border-primary',
          active ? 'border-2 border-primary' : error ? 'border-2 border-error' : 'border border-on-surface-light',
          label && 'px-2',
        )}>
          <Typography
            nowrap
            as="legend"
            variant="caption"
            className={css('invisible', label && 'px-1')}
          >
            &#8203;{label}
          </Typography>
        </fieldset>
      </div>
        {options.length > 0 && (
          <Card
            as="ul"
            elevation={2}
            className={css(
              'bg-surface overflow-y-scroll no-scrollbar',
              'origin-top transition-transform transition-opacity',
              'px-0 max-h-[19.5rem] absolute z-20 w-full',
              active ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
            )}
          >
            {options.map(({ id, value, icon, ...rest }) => (
              <li
                tabIndex={active ? 0 : -1}
                onClick={onSelect(id)}
                onKeyDown={(e) => e.key === 'Enter' && onSelect(id)()}
                className={css('btn-effect no-select cursor-pointer h-14 w-full py-2 px-6 flex items-center')}
                key={id}
              >
                {icon && <Icon className="mr-2" icon={icon} {...rest} />}
                <Typography as="span" nowrap>{value}</Typography>
              </li>
            ))}
          </Card>
        )}
    </div>
  );
};

const optionType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconType: PropTypes.oneOf(['material_icon', 'jpg', 'png', 'svg']),
  color: PropTypes.string,
});

Select.propTypes = {
  className: PropTypes.string,
  error: PropTypes.bool,
  label: PropTypes.string,
  onSelect: PropTypes.func,
  options: PropTypes.arrayOf(optionType),
  selected: optionType,
};
