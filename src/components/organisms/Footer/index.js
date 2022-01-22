import useStyles from '../../../hooks/useStyles';
import styles from './Footer.module.css';

import Card from '../../atoms/Card';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

export default function Footer() {
  const css = useStyles(styles);

  return (
    <Card
      component="footer"
      squared
      elevation={1}
      className={css('footer')}
    >
      <Button href="/app" variant="transparent" className={css('btn')}>
        <Icon icon="home" size="sm" className={css('icon')} />
      </Button>
      <Button href="/app/calendar" variant="transparent" className={css('btn')}>
        <Icon icon="calendar_today" size="sm" className={css('icon')} />
      </Button>
      <Button href="/app/transactions/create" variant="transparent" className={css('btn')}>
        <Icon icon="add_box" size="sm" className={css('icon')} />
      </Button>
      <Button href="/app/dashboard" variant="transparent" className={css('btn')}>
        <Icon icon="pie_chart" size="sm" className={css('icon')} />
      </Button>
      <Button href="/app/settings" variant="transparent" className={css('btn')}>
        <Icon icon="settings" size="sm" className={css('icon')} />
      </Button>
    </Card>
  );
}
