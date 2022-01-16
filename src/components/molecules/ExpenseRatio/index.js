import PropTypes from 'prop-types';
import Transaction from '../../../utils/Transaction';
import useStyles from '../../../hooks/useStyles';
import styles from './ExpenseRatio.module.css';

import Icon from '../../atoms/Icon';
import Progress from '../../atoms/Progress';

export default function ExpenseRatio(props) {
  const {
    category,
    icon,
    iconColor,
    max,
    value,
  } = props;

  const css = useStyles(styles);

  const percent = `${(100 * value / max).toFixed(2).toString()}%`;
  const amount = Transaction.parseMoney(value);
  
  return (
    <div className={css('container')}>
      <Icon backgroundColor={iconColor}>{icon}</Icon>
      <div className={css('details')}>
        <div className={css('text-wrapper')}>
          <span className={css('name')}>{category}</span>
          <span className={css('percent')}>{percent}</span>
          <span className={css('amount')}>{amount}</span>
        </div>
        <Progress value={value} max={max} />
      </div>
    </div>
  );
}

ExpenseRatio.propTypes = {
  category: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  iconColor: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
