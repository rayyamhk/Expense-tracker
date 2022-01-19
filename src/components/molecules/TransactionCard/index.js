import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './TransactionCard.module.css';
import Transaction from '../../../utils/Transaction';
import DateTime from '../../../utils/DateTime';

import Link from '../../atoms/Link';
import Icon from '../../atoms/Icon';

export default function TransactionCard(props) {
  const {
    amount,
    category,
    className,
    details,
    id,
    subcategory,
    datetime,
    timeHTML,
    type,
    ...iconProps
  } = props;

  const css = useStyles(styles);
  let label = category;
  if (subcategory) {
    label += `: ${subcategory}`;
  }

  return (
    <Link href={`/app/transactions/${id}`} className={css('container', className)}>
      <Icon className={css('icon')} {...iconProps} />
      <div className={css('info')}>
        <h4 className={css('category')}>{label}</h4>
        <p className={css('details')}>{details}</p>
        <time dateTime={datetime} className={css('time')}>{datetime}</time>
      </div>
      <div className={css('amount', type)}>{amount}</div>
    </Link>
  );
}

TransactionCard.propsType = {
  amount: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  className: PropTypes.string,
  datetime: PropTypes.string.isRequired,
  details: PropTypes.string,
  id: PropTypes.string.isRequired,
  subcategory: PropTypes.string,
  type: PropTypes.string.isRequired,
};
