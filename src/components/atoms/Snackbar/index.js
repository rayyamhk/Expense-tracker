import PropTypes from 'prop-types';
import useSnackbar from '../../../hooks/useSnackbar';
import useStyles from '../../../hooks/useStyles';
import styles from './Snackbar.module.css';

import {
  MdErrorOutline,
  MdWarningAmber,
  MdOutlineCheckCircleOutline,
  MdClose,
} from 'react-icons/md';
import Card from '../Card';
import Button from '../Button';

const mappings = {
  'error': MdErrorOutline,
  'success': MdOutlineCheckCircleOutline,
  'warning': MdWarningAmber,
};

export default function Snackbar(props) {
  const { className } = props;

  const css = useStyles(styles);
  const { type, message, setSnackbar } = useSnackbar();
  const Tag = mappings[type];

  const onClick = (e) => setSnackbar(null, null);

  if (!message || !type) {
    return null;
  }

  return (
    <Card className={css('container', type, className)} elevated onClick={onClick}>
      <Tag className={css('icon')} />
      {message}
      <Button className={css('icon', 'action')}>
        <MdClose />
      </Button>
    </Card>
  );
}

Snackbar.propTypes = {
  action: PropTypes.node,
  className: PropTypes.string,
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'warning', 'success']),
};
