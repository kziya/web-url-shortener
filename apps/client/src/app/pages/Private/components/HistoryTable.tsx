import { Button, Typography, styled } from '@mui/material';
import React from 'react';
import { FilterIcon, ListCheckIcon } from '../../../icons';

const HistoryTable = () => {
  return (
    <OuterWrapper>
      <TableActions>
        <HistoryText>History (4)</HistoryText>
        <ActionsWrapper>
          <ActionButton variant="contained" startIcon={<ListCheckIcon />}>
            Bulk Edit
          </ActionButton>
          <ActionButton variant="contained" startIcon={<FilterIcon />}>
            Filter
          </ActionButton>
        </ActionsWrapper>
      </TableActions>
    </OuterWrapper>
  );
};

const OuterWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  rowGap: '28px',
});

const TableActions = styled('div')({
  padding: '0 25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const HistoryText = styled(Typography)({
  fontWeight: 700,
  fontSize: '20px',
  color: '#C9CED6',
});

const ActionsWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  columnGap: '15px',
});

const ActionButton = styled(Button)({
  background: '#181E29',
  boxShadow: '0px 4px 10px 0px #0000001A',
  height: '44px',
  border: '1px solid #353C4A',
  borderRadius: '48px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '15px',
  lineHeight: '15px',
  color: '#C9CED6',
  padding: '0 25px',
  display: 'flex',
  alignItems: 'center',

  '&:hover': {
    background: '#181E29',
    boxShadow: '0px 4px 10px 0px #0000001A',
  },

  '& svg': {
    height: '15px',
    marginBottom: "3px",
  },
});

export default HistoryTable;
