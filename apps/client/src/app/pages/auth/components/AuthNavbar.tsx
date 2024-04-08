import { Link } from '@mui/joy';

export function AuthNavbar() {
  return (
    <nav>
      <Link href="/" underline="none">
        <span>Url shortener logo</span>
      </Link>
    </nav>
  );
}
