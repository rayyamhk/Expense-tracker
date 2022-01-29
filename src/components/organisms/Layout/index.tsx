import PropTypes from 'prop-types';
import css from '../../../utils/css';
import Header from '../Header';
import Footer from '../Footer';
import Snackbar from '../../molecules/Snackbar';

export type LayoutProps = {
  children?: React.ReactNode,
  headline?: string,
  hideHeader?: boolean,
};

export default function Layout(props: LayoutProps) {
  const {
    children,
    headline,
    hideHeader = false,
  } = props;

  const classes = css(
    'bg-background overflow-x-hidden overflow-y-scroll no-scrollbar',
    hideHeader ? 'h-[calc(100%-56px)] p-0' : 'h-[calc(100%-112px)] p-4'
  );

  return (
    <div className="w-screen h-screen max-w-[30rem] mx-auto">
      <Header headline={headline} hidden={hideHeader} />
      <main className={classes}>
        {children}
      </main>
      <Snackbar className="fixed bottom-[calc(56px+1rem)] right-4 left-4 z-40" />
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  headline: PropTypes.string,
  hideHeader: PropTypes.bool,
};
