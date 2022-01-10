import PropTypes from 'prop-types';
import Icon from '../../atoms/Icon';
import useStyles from '../../../hooks/useStyles';
import styles from './TransactionCard.module.css';

export default function TransactionCard(props) {
  const {
    amount,
    category,
    className,
    details,
    icon: Tag,
    iconColor: color,
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
    <div className={css('container', className)} tabIndex="0">
      <Icon backgroundColor={color}>
        <Tag />
      </Icon>
      <div className={css('info')}>
        <h4 className={css('category')}>{label}</h4>
        <p className={css('details')}>{details}</p>
        <time dateTime={time} className={css('time')}>{time}</time>
      </div>
      <div className={css('amount', type)}>${amount}</div>
    </div>
  );
}

TransactionCard.propsType = {
  amount: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
  className: PropTypes.string,
  details: PropTypes.string,
  icon: PropTypes.node.isRequired,
  iconColor: PropTypes.string,
  subcategory: PropTypes.string,
  time: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
