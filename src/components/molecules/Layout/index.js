import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Snackbar from '../../atoms/Snackbar';
import { useError } from '../../../hooks/useError';
import useStyles from '../../../hooks/useStyles';
import styles from './Layout.module.css';

export default function Layout(props) {
  const {
    children,
    headline,
    hideHeader = false,
  } = props;

  const { type, message, setError } = useError();
  const css = useStyles(styles);
  const onClose = () => setError(null, null);

  return (
    <div className={css('view-port')}>
      <Header hidden={hideHeader} headline={headline} />
      {children}
      {type && message && (
        <Snackbar
          type={type}
          message={message}
          onClose={onClose}
          className={css('snackbar')}
        />
      )}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  headline: PropTypes.string,
  hideHeader: PropTypes.bool,
};
