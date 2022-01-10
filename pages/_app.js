import { ErrorProvider } from '../src/hooks/useError'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorProvider debug>
      <Component {...pageProps} />
    </ErrorProvider>
  );
}

export default MyApp
