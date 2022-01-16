import { useEffect } from 'react';
import useDatabase from '../../src/hooks/useDatabase';
import useSettings from '../../src/hooks/useSettings';
import Icon from '../../src/components/atoms/Icon';

export default function Transactions() {
  const db = useDatabase('my-test-app');
  const [paymentSettings, setPaymentSettings] = useSettings('payments');
  useEffect(() => {
    // setPaymentSettings('payme', { icon: 'PayMe' });
  }, [])

  return <Icon name="PayMe" backgroundColor="#d32f2f" />;
}
