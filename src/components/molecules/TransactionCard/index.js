import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './TransactionCard.module.css';
import Transaction from '../../../utils/Transaction';
import DateTime from '../../../utils/DateTime';
import Settings from '../../../utils/Settings';

import Link from '../../atoms/Link';
import Icon from '../../atoms/Icon';

const settings = Settings.getFakeSettings();

export default function TransactionCard(props) {
  const {
    amount,
    category,
    className,
    details,
    icon,
    iconColor: color,
    id,
    subcategory,
    datetime, // millisecond
    type,
  } = props;

  const css = useStyles(styles);
  const timeDisplay = DateTime.getStringFromTimestamp(datetime, 'time', settings);
  const timeHTML = DateTime.getStringFromTimestamp(datetime, 'html', settings);
  const amountDisplay = Transaction.parseMoney(amount);
  let label = category;
  if (subcategory) {
    label += `: ${subcategory}`;
  }

  return (
    <Link href={`/app/transaction/${id}`} className={css('container', className)}>
      <Icon backgroundColor={color}>
        {icon}
      </Icon>
      <div className={css('info')}>
        <h4 className={css('category')}>{label}</h4>
        <p className={css('details')}>{details}</p>
        <time dateTime={timeHTML} className={css('time')}>{timeDisplay}</time>
      </div>
      <div className={css('amount', type)}>{amountDisplay}</div>
    </Link>
  );
}

TransactionCard.propsType = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  className: PropTypes.string,
  datetime: PropTypes.string.isRequired,
  details: PropTypes.string,
  icon: PropTypes.node.isRequired,
  iconColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  subcategory: PropTypes.string,
  type: PropTypes.string.isRequired,
};
