import PropTypes from 'prop-types';
import Link from '../../atoms/Link';
import Icon from '../../atoms/Icon';
import useStyles from '../../../hooks/useStyles';
import styles from './TransactionCard.module.css';
import Transaction from '../../../utils/Transaction';

export default function TransactionCard(props) {
  const {
    amount,
    category,
    className,
    details,
    icon: Tag,
    iconColor: color,
    id,
    subcategory,
    time,
    type,
  } = props;

  const css = useStyles(styles);
  let label = category;
  if (subcategory) {
    label += `: ${subcategory}`;
  }

  return (
    <Link href={`/app/transaction/${id}`} className={css('container', className)}>
      <Icon backgroundColor={color}>
        <Tag />
      </Icon>
      <div className={css('info')}>
        <h4 className={css('category')}>{label}</h4>
        <p className={css('details')}>{details}</p>
        <time dateTime={time} className={css('time')}>{time}</time>
      </div>
      <div className={css('amount', type)}>{Transaction.parseMoney(amount)}</div>
    </Link>
  );
}

TransactionCard.propsType = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  className: PropTypes.string,
  details: PropTypes.string,
  icon: PropTypes.node.isRequired,
  iconColor: PropTypes.string,
  id: PropTypes.string.isRequired,
  subcategory: PropTypes.string,
  time: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
