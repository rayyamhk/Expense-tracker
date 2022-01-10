import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import useStyles from '../../../hooks/useStyles';
import styles from './Layout.module.css';

export default function Layout(props) {
  const {
    children,
    headline,
    hideHeader = false,
  } = props;

  const css = useStyles(styles);

  return (
    <div className={css('view-port')}>
      <Header hidden={hideHeader} headline={headline} />
      {children}
      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  headline: PropTypes.string,
  hideHeader: PropTypes.bool,
};
