import { Button, TextField, styled } from '@mui/material';
import React from 'react';
import { LinkIcon } from '../../../icons';

const Search = () => {
  return (
    <OuterWrapper>
      <SearchTextfield
        InputProps={{
          startAdornment: <LinkIcon />,
          endAdornment: (
            <ShortenButton variant="contained">Shorten Now!</ShortenButton>
          ),
        }}
        placeholder="Enter the link here"
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

  '& svg': {
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

export default Search;
