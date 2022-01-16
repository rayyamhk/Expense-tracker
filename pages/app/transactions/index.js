import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useDatabase from '../../../src/hooks/useDatabase';
import useStyles from '../../../src/hooks/useStyles';
import styles from '../../../styles/transaction.module.css';
import Query from '../../../src/utils/Query';

import Layout from '../../../src/components/molecules/Layout';

export default function Transactions() {
  const [query, setQuery] = useState({});
  const router = useRouter();
  const db = useDatabase('my-test-app');
  const css = useStyles(styles);

  useEffect(() => {
    let isMounted = true;
    if (router.isReady && isMounted) {
      // const query = Query.parseQuery(router.query);
      // console.log(query);
      db.connect('payments', 'readwrite')
        .then((store) => {
          // store.put({ id: 'cash', value: 'Cash', icon: 'Money', color: '#4caf50' });
          // store.put({ id: 'octopus_card', value: 'Octopus Card', icon: 'Money', color: '#ffeb3b' });
          // store.put({ id: 'payme', value: 'PayMe', icon: 'Money', color: '#d32f2f' });
          // store.put({ id: 'apple_pay', value: 'Apple Pay', icon: 'ApplePay', color: '#000000' });
          // store.put({ id: 'samsung_pay', value: 'Samsung Pay', icon: 'SamsungPay', color: '#1565c0' });
          // store.put({ id: 'google_pay', value: 'Google Pay', icon: 'GooglePay', color: '#29b6f6' });
          // store.put({ id: 'fps', value: 'FPS', icon: 'Bank', color: '#6d4c41' });
          // store.put({ id: 'credit_card', value: 'Credit Card', icon: 'Credit Card', color: '#009688' });
          // store.put({ id: 'bank_transfer', value: 'Bank Transfer', icon: 'Transfer', color: '#ff9800' });
        });
    }
    return () => isMounted = false;
  }, [router]);

  return (
    <Layout headline="Transactions" className={css('main')}>
      
    </Layout>
  );
}
