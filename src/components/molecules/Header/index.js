import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import useSettings from '../../../hooks/useSettings';
import useDatabase from '../../../hooks/useDatabase';
import useSnackbar from '../../../hooks/useSnackbar';
import useStyles from '../../../hooks/useStyles';
import styles from './Header.module.css';

import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';
import Switch from '../../atoms/Switch';

export default function Header(props) {
  const {
    headline,
    hidden = false,
  } = props;

  const router = useRouter();
  const db = useDatabase('my-test-app');
  const [settings, reloadSettings] = useSettings();
  const [setSnackbar] = useSnackbar();
  const css = useStyles(styles);

  if (hidden || !settings) {
    return null;
  }

  const redirectPrevPage = () => router.back();
  const onChange = async () => {
    try {
      const store = await db.connect('common', 'readwrite');
      const value = {
        mode: settings.theme.mode === 'dark' ? 'light' : 'dark',
        color: settings.theme.color,
      };
      await store.put({ id: 'theme', value });
      reloadSettings('theme');
    } catch ({ name, message }) {
      setSnackbar('error', `${name}: ${message}`);
    }
  };

  return (
    <header className={css('header')}>
      <Button
        onClick={redirectPrevPage}
        variant='transparent'
        className={css('back-arrow')}
      >
        <Icon icon="arrow_back" />
      </Button>
      <h1 className={css('headline')}>{headline}</h1>
      <Switch
        className={css('switch')}
        checked={settings.theme.mode === 'dark'}
        checkedIcon={<Icon icon="dark_mode" className={css('icon', 'no-select')} />}
        uncheckedIcon={<Icon icon="light_mode" className={css('icon', 'no-select')} />}
        onChange={onChange}
      />
    </header>
  )
}

Header.propTypes = {
  headline: PropTypes.string,
  hidden: PropTypes.bool,
};
