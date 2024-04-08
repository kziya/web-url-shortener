import styles from '../auth.module.scss';
import { Link } from '@mui/joy';

export function AuthNavbar() {
  return (
    <nav className={styles.nav}>
      <Link href="/" underline="none">
        <span>Url shortener logo</span>
      </Link>
    </nav>
  );
}
