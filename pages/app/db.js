import { useEffect } from 'react';
import useDatabase from '../../src/hooks/useDatabase';
import useSettings from '../../src/hooks/useSettings';
import Icon from '../../src/components/atoms/Icon';
import { nanoid } from 'nanoid';

export default function Transactions() {
  const db = useDatabase('my-test-app');
  const [getCategories, setCategories] = useSettings('categories');
  const [getSubcategories, setSubcategories] = useSettings('subcategories');
  useEffect(() => {
    const init = async () => {
      try {
        const store = await db.connect('payments');
        const { result } = await store.getAll();
        console.log(result);
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
