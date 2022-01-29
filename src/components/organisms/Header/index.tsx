import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import useSettings from '../../../hooks/useSettings';
import useDatabase from '../../../hooks/useDatabase';
import useSnackbar from '../../../hooks/useSnackbar';

import Card from '../../atoms/Card';
import Typography from '../../atoms/Typography';
import IconButton from '../../atoms/IconButton';
import Switch from '../../atoms/Switch';

export type HeaderProps = {
  headline?: string,
  hidden?: boolean,
};

export default function Header(props: HeaderProps) {
  const {
    headline,
    hidden = false,
  } = props;

  const router = useRouter();
  const db = useDatabase('my-test-app');
  const [settings, reloadSettings] = useSettings();
  const [setSnackbar] = useSnackbar();

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
      as="header"
      elevation={1}
      squared
      className="bg-layout w-full p-0 flex items-center relative z-50"
    >
      <IconButton
        icon="arrow_back"
        size="xl"
        variant="transparent"
        onClick={redirectPrevPage}
        squared
        className="text-on-layout"
      />
      <Typography
        as="h1"
        variant="h2"
        className="text-on-layout flex-grow"
      >
        {headline}
      </Typography>
      <Switch
        className="mr-5"
        checked={themeMode === 'dark'}
        onChange={onChange}
      />
    </Card>
  );
};

Header.propTypes = {
  headline: PropTypes.string,
  hidden: PropTypes.bool,
};
