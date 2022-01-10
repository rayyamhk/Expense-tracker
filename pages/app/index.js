import { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import Layout from '../../src/components/molecules/Layout';
import Button from '../../src/components/atoms/Button';
import Card from '../../src/components/atoms/Card';
import Progress from '../../src/components/atoms/Progress';
import TransactionCard from '../../src/components/molecules/TransactionCard';
import useStyles from '../../src/hooks/useStyles';
import styles from '../../styles/app.module.css';

import { todayExpense, categories } from '../../src/fake';

export default function App() {
  const [visible, setVisible] = useState(true);
  const css = useStyles(styles);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const isOverBudget = false;
  const balance = '-$150.0';

  return (
    <Layout hideHeader={true}>
      <header className={css('header')}>
        <time dateTime="2022-01-04" className={css('header-time')}>
          Tue Jan 4, 2022
        </time>
        <div className={css('header-balance')}>
          <Button variant="transparent" onClick={toggleVisibility}>
            {visible ? <MdVisibility /> : <MdVisibilityOff />}
          </Button>
          Balance: {visible ? balance : '✱✱✱✱✱'}
        </div>
        <Card elevated className={css('budget-card')}>
          <p className={css('budget-status', isOverBudget && 'over-budget')}>
            Budget of this month: <span>$1,549.0</span> out of $10,000.0
          </p>
          <Progress value={1549} max={10000}/>
        </Card>
      </header>
      <main className={css('main')}>
        <section className={css('group')}>
          <h3 className={css('group-title')}>
            Recent Transcations
          </h3>
          <Card elevated>
            {todayExpense.map((trans) => {
              const Tag = categories[trans.category].icon;
              const color = categories[trans.category].color;
              return (
                <TransactionCard
                  iconColor={color}
                  icon={Tag}
                  onClick={toggleVisibility}
                  key={trans.id}
                  {...trans}
                />
              );
            })}
          </Card>
        </section>
        <section className={css('group')}>
          <h3 className={css('group-title')}>
            Top 5
          </h3>
        </section>
      </main>
    </Layout>
  );
}
