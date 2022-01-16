import { useState } from 'react';
import PropTypes from 'prop-types';
import { MdArrowDropDown } from 'react-icons/md';
import Card from '../Card';
import Icon from '../Icon';
import useStyles from '../../../hooks/useStyles';
import styles from './Select.module.css';

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
      <div onClick={onClose} className={css('hidden-overlay')} />
      <span className={css('label')}>{label}</span>
      <div onClick={onToggle}>
        <div className={css('display')}>&#8203;{selected?.value}</div>
        <MdArrowDropDown size="1.5rem" className={css('arrow')} />
        <fieldset className={css('fieldset')}>
          <legend className={css('legend')}>{label}</legend>
        </fieldset>
      </div>
        {options.length > 0 && (
          <Card component="ul" elevated className={css('options', 'no-scrollbar')}>
            {options.map((option) => (
              <li
                onClick={() => {
                  onSelect(option);
                  onClose();
                }}
                className={css('option')}
                key={option.id}
              >
                {option.icon && option.color && <Icon name={option.icon} backgroundColor={option.color} className={css('icon')} />}
                {option.value}
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
  icon: PropTypes.node,
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
