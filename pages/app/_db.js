import { useEffect } from 'react';
import useDatabase from '../../src/hooks/useDatabase';
import DateTime from '../../src/utils/DateTime';

export default function Transactions() {
  const db = useDatabase('my-test-app');
  useEffect(() => {
    const init = async () => {
      try {
        const store = await db.connect('commonx');
        const result = await store.getAll();
        
        console.log(!!result.result);
      } catch (error) {
        console.debug(error);
      }
    }
    init();
  }, [db])



  return (
    <span className="material-icons" style={{color: '#aaa'}}>
      lunch_dining
    </span>
  )
}
