import { MessageProvider } from '../src/hooks/useSnackbar';
import { SettingsProvider } from '../src/hooks/useSettings';
import '../src/assets/css/global.css';
import '../src/assets/css/variables.css';

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
