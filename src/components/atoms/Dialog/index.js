import PropTypes from 'prop-types';
import useStyles from '../../../hooks/useStyles';
import styles from './Dialog.module.css';

import Card from '../Card';

export default function Dialog(props) {
  const {
    children,
    className,
    onClose: close,
  } = props;

  const css = useStyles(styles);
  const onClose = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div className={css('overlay')} onClick={onClose}>
      <Card elevated className={css('container', className)}>
        {children}
      </Card>
    </div>
  );
}

Dialog.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClise: PropTypes.func,
};
