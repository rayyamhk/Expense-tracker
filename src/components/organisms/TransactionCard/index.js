import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './TransactionCard.module.css';

import Link from '../../atoms/Link';
import Icon from '../../atoms/Icon';
import Typography from '../../atoms/Typography';

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
  let label = subcategory || category;

  return (
    <Link
      href={`/app/transactions/${id}`}
      className={css('container', 'click-effect', 'p-2', className)}
    >
      <Icon className={css('icon')} size="lg" {...iconProps} />
      <div className={css('text-container', 'mx-2')}>
        <Typography
          component="h5"
          variant="h5"
          className="mb-1"
        >
          {label}
        </Typography>
        <Typography
          component="p" 
          variant="body"
          className={css('mb-1', 'no-wrap')}
        >
          {details}
        </Typography>
        <Typography
          component="time"
          variant="caption"
          className={css('time')}
        >
          {datetime}
        </Typography>
      </div>
      <Typography
        component="span"
        variant="body"
        className={css('amount', type)}
      >
        {amount}
      </Typography>
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
