import { Button, CircularProgress, TextField, styled } from '@mui/material';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { LinkIcon } from '../../../icons';
import { useShortUrl } from '../../../short-url/ShortUrlContext';

const Search = () => {
  const { createPrivateUrl, newPrivateUrlLoading } = useShortUrl();

  const [url, setUrl] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUrl(value);
  };

  const handleSubmit = () => {
    if (!url) {
      return toast.error('You should enter a valid url');
    }
    createPrivateUrl(url);
  };

  return (
    <OuterWrapper>
      <SearchTextfield
        InputProps={{
          startAdornment: <LinkIcon />,
          endAdornment: (
            <ShortenButton variant="contained" onClick={handleSubmit}>
              {newPrivateUrlLoading ? <Loader /> : 'Shorten Now!'}
            </ShortenButton>
          ),
        }}
        placeholder="Enter the link here"
        onChange={handleInputChange}
        value={url}
      />
    </OuterWrapper>
  );
};

const OuterWrapper = styled('div')({
  width: '1100px',
  margin: '0 auto',
  maxWidth: '80%',
});

const SearchTextfield = styled(TextField)({
  width: '100%',

  '& .MuiInputBase-root': {
    height: '76px',
    padding: '8px 10px 8px 25px',
  },

  '& fieldset': {
    background: '#181E29',
    borderRadius: '48px',
    border: '4px solid #353C4A',
    boxShadow: ' 0px 4px 10px 0px #0000001A',
  },

  '&  .MuiInputBase-root > svg': {
    zIndex: 1,
    marginRight: '20px',
  },

  '& input': {
    zIndex: 1,
    color: '#C9CED6',
  },
});

const ShortenButton = styled(Button)({
  minWidth: '180px',
  borderRadius: '48px',
  fontWeight: 600,
  fontSize: '16px',
  zIndex: 1,
  height: '100%',
  textTransform: 'none',
});

const Loader = styled(CircularProgress)({
  color: '#fff',
});

export default Search;
