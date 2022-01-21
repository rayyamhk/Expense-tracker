import { useState } from 'react';
import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Select.module.css';

import Card from '../Card';
import Icon from '../Icon';
import Typography from '../Typography';

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
      <Typography
        nowrap
        component="label"
        variant={active || selected ? 'caption' : 'body'}
        className={css('label')}
      >
        {label}
      </Typography>
      <div onClick={onToggle}>
        <Typography
          nowrap
          component="div"
          variant="body"
          className={css('display', 'p-2', 'pr-4')}
        >
          &#8203;{selected?.value}
        </Typography>
        <Icon icon="arrow_drop_down" size="sm" className={css('arrow')} />
        <fieldset className={css('fieldset')}>
          <Typography
            nowrap
            component="legend"
            variant="caption"
            className={css('legend', (selected || active) && 'pr-1')}
          >
            {label}
          </Typography>
        </fieldset>
      </div>
        {options.length > 0 && (
          <Card
            component="ul"
            elevation={2}
            className={css('options', 'py-1', 'no-scrollbar')}
          >
            {options.map(({ id, value, icon, ...rest }) => (
              <li
                onClick={() => {
                  onSelect(id);
                  onClose();
                }}
                className={css('option', 'py-1', 'px-2', 'click-effect')}
                key={id}
              >
                {icon && <Icon className={css('icon')} icon={icon} {...rest} />}
                <Typography
                  component="span"
                  variant="body"
                  className={css(icon && 'ml-2')}
                >
                  {value}
                </Typography>
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
