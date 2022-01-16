import { MessageProvider } from '../src/hooks/useSnackbar';
import '../styles/normalize.css';
import '../styles/utilities.css';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <MessageProvider>
      <Component {...pageProps} />
    </MessageProvider>
  );
}

export default MyApp
