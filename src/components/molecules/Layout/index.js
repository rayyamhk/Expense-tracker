import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import Snackbar from '../../atoms/Snackbar';
import useStyles from '../../../hooks/useStyles';
import styles from './Layout.module.css';

export default function Layout(props) {
  const {
    children,
    className,
    hideHeader = false,
    ...rest
  } = props;

  const css = useStyles(styles);

  return (
    <div className={css('view-port')}>
      <Header hidden={hideHeader} {...rest} />
      <main className={css('main', 'no-scrollbar', hideHeader && 'no-header', className)}>
        {children}
      </main>
      <Snackbar className={css('snackbar')} />
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hideHeader: PropTypes.bool,
};
