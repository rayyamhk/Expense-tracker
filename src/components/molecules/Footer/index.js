import useStyles from '../../../hooks/useStyles';
import styles from './Footer.module.css';
import Icon from '../../atoms/Icon';
import Button from '../../atoms/Button';

export default function Footer() {
  const css = useStyles(styles);

  return (
    <footer className={css('container')}>
      <Button href="/app" variant="transparent" className={css('btn')}>
        <Icon icon="home" />
      </Button>
      <Button href="/app/calendar" variant="transparent" className={css('btn')}>
        <Icon icon="calendar_today" />
      </Button>
      <Button href="/app/transactions/create" variant="transparent" className={css('btn')}>
        <Icon icon="add_box" />
      </Button>
      <Button href="/app/dashboard" variant="transparent" className={css('btn')}>
        <Icon icon="pie_chart" />
      </Button>
      <Button href="/app/settings" variant="transparent" className={css('btn')}>
        <Icon icon="settings" />
      </Button>
    </footer>
  );
}
