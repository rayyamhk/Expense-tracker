import { 
  MdHome,
  MdCalendarToday,
  MdAddBox,
  MdPieChartOutline,
  MdOutlineSettings,
} from 'react-icons/md';
import Button from '../../atoms/Button';
import useStyles from '../../../hooks/useStyles';
import styles from './Footer.module.css';

export default function Footer() {
  const css = useStyles(styles);

  return (
    <footer className={css('container')}>
      <Button href="/app" variant="transparent" className={css('btn')}>
        <MdHome />
      </Button>
      <Button href="/app/calendar" variant="transparent" className={css('btn')}>
        <MdCalendarToday />
      </Button>
      <Button href="/app/transactions/create" variant="transparent" className={css('btn')}>
        <MdAddBox />
      </Button>
      <Button href="/app/dashboard" variant="transparent" className={css('btn')}>
        <MdPieChartOutline />
      </Button>
      <Button href="/app/settings" variant="transparent" className={css('btn')}>
        <MdOutlineSettings />
      </Button>
    </footer>
  );
}
