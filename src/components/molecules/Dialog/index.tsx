import PropTypes from 'prop-types';
import css from '../../../utils/css';
import Card from '../../atoms/Card';

export type DialogProps = {
  children?: React.ReactNode,
  className?: string,
  onClose: (e?: React.MouseEvent) => void;
};

export default function Dialog(props: DialogProps) {
  const {
    children,
    className,
    onClose: handleClose,
  } = props;

  const onClose = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const classes = css(
    'bg-surface max-w-full',
    className,
  );

  return (
    <div
      className="bg-overlay p-4 center fixed inset-0 z-40"
      onClick={onClose}
    >
      <Card elevation={3} className={classes}>
        {children}
      </Card>
    </div>
  );
};

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
