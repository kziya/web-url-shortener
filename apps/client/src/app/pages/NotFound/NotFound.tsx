import styles from './not-found.module.scss';
import { Typography } from '@mui/material';
import { Link } from '@mui/joy';

export function NotFound() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <div>
          <Typography variant="h1">404 Not Found</Typography>
        </div>
        <div className={styles.linkPlace}>
          <Link
            href="/"
            variant="solid"
            underline="none"
            color="primary"
            fontSize="24px"
            borderRadius="5px"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
