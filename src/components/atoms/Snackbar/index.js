import PropTypes from 'prop-types';
import {
  MdErrorOutline,
  MdWarningAmber,
  MdOutlineCheckCircleOutline,
  MdClose,
} from 'react-icons/md';
import Card from '../Card';
import useStyles from '../../../hooks/useStyles';
import styles from './Snackbar.module.css';

const mappings = {
  'error': MdErrorOutline,
  'success': MdOutlineCheckCircleOutline,
  'warning': MdWarningAmber,
};

export default function Snackbar(props) {
  const {
    className,
    message,
    onClose,
    type,
  } = props;

  const css = useStyles(styles);
  const Tag = mappings[type];

  return (
    <Card className={css('container', type, className)} onClick={onClose} elevated>
      <Tag className={css('icon')} />
      {message}
      <MdClose className={css('icon', 'close')} />
    </Card>
  );
}

Snackbar.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  type: PropTypes.oneOf(['error', 'warning', 'success']),
};
