import { Typography, styled } from '@mui/material';
import { Link } from '@mui/joy';

export function NotFound() {
  return (
    <OuterWrapper>
      <div>
        <Title variant="h1">404 Not Found</Title>
      </div>
      <div>
        <Link
          href="/"
          variant="solid"
          underline="none"
          color="primary"
          fontSize="24px"
          borderRadius="5px"
        >
          Back home
        </Link>
      </div>
    </OuterWrapper>
  );
}

const OuterWrapper = styled('main')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  height: '100%',
  backgroundImage: "url('assets/auth-background.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
});

const Title = styled(Typography)({
  color: '#fff',
});
