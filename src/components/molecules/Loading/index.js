import CircularProgress from '../../atoms/CircularProgress';
import useStyles from '../../../hooks/useStyles';
import styles from './Loading.module.css';

export default function Loading() {
  const css = useStyles(styles);

  return (
    <div className={css('container')}>
      <CircularProgress />
    </div>
  );
}
