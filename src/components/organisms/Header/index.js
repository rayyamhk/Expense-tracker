import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import useSettings from '../../../hooks/useSettings';
import useDatabase from '../../../hooks/useDatabase';
import useSnackbar from '../../../hooks/useSnackbar';
import useStyles from '../../../hooks/useStyles';
import styles from './Header.module.css';

import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';
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

  if (hidden) {
    return null;
  }

  const themeMode = settings?.theme?.mode || 'light';
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
    <Card
      component="header"
      elevation={2}
      squared
      className={css('header')}
    >
      <Button
        onClick={redirectPrevPage}
        variant='transparent'
        className={css('arrow-btn')}
      >
        <Icon icon="arrow_back" size="sm" className={css('arrow')} />
      </Button>
      <Typography
        component="h1"
        variant="h2"
        className={css('headline')}
      >
        {headline}
      </Typography>
      <Switch
        className={css('switch')}
        checked={themeMode === 'dark'}
        checkedIcon={<Icon icon="dark_mode" color="#FFFFFF" size="xs" />}
        uncheckedIcon={<Icon icon="light_mode" color="#FFFFFF" size="xs" />}
        onChange={onChange}
      />
    </Card>
  );
};

Header.propTypes = {
  headline: PropTypes.string,
  hidden: PropTypes.bool,
};
