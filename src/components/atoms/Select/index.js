import { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Select.module.css';

import Card from '../Card';
import Icon from '../Icon';

export default function Select(props) {
  const {
    className,
    error = false,
    label,
    onSelect,
    options,
    selected,
  } = props;

  const [active, setActive] = useState(false);
  const css = useStyles(styles);

  const onToggle = () => setActive(!active);
  const onClose = () => setActive(false);
  const classes = css(
    'select-container',
    active && 'active',
    selected && 'selected',
    error && 'error',
    className,
  );

  return (
    <div className={css(classes)}>
      <div onClick={onClose} className={css('overlay', !active && 'hidden')} />
      <span className={css('label')}>{label}</span>
      <div onClick={onToggle}>
        <div className={css('display')}>&#8203;{selected?.value}</div>
        <Icon icon="arrow_drop_down" className={css('arrow')} />
        <fieldset className={css('fieldset')}>
          <legend className={css('legend')}>{label}</legend>
        </fieldset>
      </div>
        {options.length > 0 && (
          <Card component="ul" elevated className={css('options', 'no-scrollbar')}>
            {options.map(({ id, value, icon, ...rest }) => (
              <li
                onClick={() => {
                  onSelect(id);
                  onClose();
                }}
                className={css('option')}
                key={id}
              >
                {icon && <Icon className={css('icon')} icon={icon} {...rest} />}
                <span className={css('option-display', icon && 'with-icon')}>{value}</span>
              </li>
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
