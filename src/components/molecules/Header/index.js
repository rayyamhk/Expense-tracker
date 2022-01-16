import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { MdArrowBack } from 'react-icons/md';
import Button from '../../atoms/Button';
import useStyles from '../../../hooks/useStyles';
import styles from './Header.module.css';

export default function Header(props) {
  const {
    actions,
    headline,
    hidden = false,
  } = props;

  const router = useRouter();
  const css = useStyles(styles);

  if (hidden) {
    return null;
  }

  const redirectPrevPage = () => router.back();

  return (
    <header className={css('header')}>
      <Button
        onClick={redirectPrevPage}
        variant='transparent'
        className={css('back-arrow')}
      >
        <MdArrowBack />
      </Button>
      <h1 className={css('headline')}>{headline}</h1>
      {actions}
    </header>
  )
}

Header.propTypes = {
  actions: PropTypes.node,
  headline: PropTypes.string,
  hidden: PropTypes.bool,
};
