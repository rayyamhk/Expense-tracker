import PropTypes from 'prop-types';
import useSnackbar from '../../../hooks/useSnackbar';
import css from '../../../utils/css';
import Icon from '../../atoms/Icon';
import Card from '../../atoms/Card';
import IconButton from '../../atoms/IconButton';
import Typography from '../../atoms/Typography';

export type SnackbarProps = {
  className?: string,
};

const icons = {
  'error': 'error',
  'success': 'check_circle',
  'warning': 'warning_amber',
};

const styles = {
  'error': 'text-on-error bg-error',
  'success': 'text-on-success bg-success',
  'warning': 'text-on-warning bg-warning',
};

export default function Snackbar({ className }: SnackbarProps) {
  const [setSnackbar, type, message] = useSnackbar();
  const onClick = () => setSnackbar(null, null);

  if (!message || !type) {
    return null;
  }

  const classes = css(
    'flex items-center w-full',
    styles[type],
    className,
  );

  return (
    <Card elevation={2} className={classes}>
      <Icon icon={icons[type]} size="md" className="mr-2" />
      <Typography className="flex-1">{message}</Typography>
      <IconButton
        icon="close"
        size="sm"
        variant="transparent"
        onClick={onClick}
      />
    </Card>
  );
}

Snackbar.propTypes = {
  className: PropTypes.string,
};
