import styles from '../auth.module.scss';
import { Link } from '@mui/joy';
import { Link as ReactRouterLink } from 'react-router-dom';

export function AuthNavbar() {
  return (
    <nav className={styles.nav}>
      <Link to="/" underline="none" component={ReactRouterLink}>
        <span>Url shortener logo</span>
      </Link>
    </nav>
  );
}
