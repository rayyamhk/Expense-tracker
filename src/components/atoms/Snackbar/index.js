import PropTypes from 'prop-types';
import useSnackbar from '../../../hooks/useSnackbar';
import useStyles from '../../../hooks/useStyles';
import styles from './Snackbar.module.css';

import Icon from '../Icon';
import Card from '../Card';
import Button from '../Button';

const mappings = {
  'error': 'error',
  'success': 'check_circle',
  'warning': 'warning_amber',
};

export default function Snackbar(props) {
  const { className } = props;

  const css = useStyles(styles);
  const { type, message, setSnackbar } = useSnackbar();
  const icon = mappings[type];

  const onClick = () => setSnackbar(null, null);

  if (!message || !type) {
    return null;
  }

  return (
    <Card className={css('container', type, className)} elevated onClick={onClick}>
      <Icon icon={icon} className={css('icon')} />
      {message}
      <Button className={css('icon', 'action')}>
        <Icon icon="close" />
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
