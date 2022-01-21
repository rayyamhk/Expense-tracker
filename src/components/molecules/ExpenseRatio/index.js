import PropTypes from 'prop-types';
import Transaction from '../../../utils/Transaction';
import useStyles from '../../../hooks/useStyles';
import styles from './ExpenseRatio.module.css';

import Icon from '../../atoms/Icon';
import Progress from '../../atoms/Progress';
import Typography from '../../atoms/Typography';

export default function ExpenseRatio(props) {
  const {
    category,
    max,
    value,
    ...iconProps
  } = props;

  const css = useStyles(styles);

  const percent = `${(100 * value / max).toFixed(2).toString()}%`;
  const amount = Transaction.parseMoney(value);
  
  return (
    <div className={css('container', 'p-2')}>
      <Icon size="lg" {...iconProps} />
      <div className={css('details', 'ml-2')}>
        <div className={css('text-wrapper', 'mb-1')}>
          <Typography component="span" variant="h5" className={css('name', 'mr-1')}>{category}</Typography>
          <Typography component="span" variant="h6" className={css('percent')}>{percent}</Typography>
          <Typography component="span" variant="h6" className={css('amount')}>{amount}</Typography>
        </div>
        <Progress value={value} max={max} />
      </div>
    </div>
  );
}

ExpenseRatio.propTypes = {
  category: PropTypes.string.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
