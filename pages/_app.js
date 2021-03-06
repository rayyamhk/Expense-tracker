import { MessageProvider } from '../src/hooks/useSnackbar';
import { SettingsProvider } from '../src/hooks/useSettings';
import '../styles/normalize.css';
import '../styles/utilities.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <SettingsProvider>
      <MessageProvider>
        <Component {...pageProps} />
      </MessageProvider>
    </SettingsProvider>
  );
}

export default MyApp
