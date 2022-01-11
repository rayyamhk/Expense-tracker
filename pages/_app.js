import { MessageProvider } from '../src/hooks/useSnackbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <MessageProvider>
      <Component {...pageProps} />
    </MessageProvider>
  );
}

export default MyApp
