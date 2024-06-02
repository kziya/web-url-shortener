import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import React, { useMemo } from 'react';
import { CopyIcon, DeleteIcon } from '../../../icons';
import { useShortUrl } from '../../../short-url/ShortUrlContext';

const HistoryTable = () => {
  const { urlsList, urlListLoading } = useShortUrl();

  const rows = useMemo(() => {
    return urlsList.map((item) =>
      createData(
        item._id,
        item.shortUrl,
        item.url,
        item.clickCount,
        item.expiresAt
      )
    );
  }, [urlsList]);

  return (
    <OuterWrapper>
      <TableActions>
        <HistoryText>History ({urlsList.length})</HistoryText>
        {/* <ActionsWrapper>
          <ActionButton variant="contained" startIcon={<ListCheckIcon />}>
            Bulk Edit
          </ActionButton>
          <ActionButton variant="contained" startIcon={<FilterIcon />}>
            Filter
          </ActionButton>
        </ActionsWrapper> */}
      </TableActions>
      <TableContainer component={StyledPaper}>
        <Table>
          <TableHead>
            <StyledTableHeadRow>
              <TableCell>Short Link</TableCell>
              <TableCell>Original Link</TableCell>
              <TableCell>Clicks</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </StyledTableHeadRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableBodyRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.shortLink}
                </TableCell>
                <TableCell>{row.originalLink}</TableCell>
                <TableCell>{row.clicks}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell align="right">{row.action}</TableCell>
              </StyledTableBodyRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    marginBottom: '3px',
  },
});

const StyledPaper = styled(Paper)({
  background: 'transparent',
  boxShadow: 'none',

  '& .MuiTableCell-root': {
    border: 'none',
    fontSize: '14px',
    fontWeight: 300,
    color: '#C9CED6',
  },

  '& table': {
    borderCollapse: 'separate',
    borderSpacing: '0px 3px',
  },
});

const StyledTableHeadRow = styled(TableRow)({
  background: '#0D1117',

  '& .MuiTableCell-root': {
    color: '#C9CED6',
  },

  '& .MuiTableCell-root:first-child': {
    borderRadius: '10px 0px 0px 0px',
  },

  '& .MuiTableCell-root:last-child': {
    borderRadius: '0px 10px 0px 0px',
  },
});

const StyledTableBodyRow = styled(TableRow)({
  background: '#181E2938',
  boxShadow: '0px 4px 10px 0px #0000001A',
  backdropFilter: 'blur(10px)',
});

const WithAdornment = styled('div')({
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px',
});

const CopyIconWrapper = styled('div')({
  cursor: 'pointer',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
});

const StyledIconButton = styled(IconButton)({
  background: '#181E29',
  border: '1px solid #353C4A',
  boxShadow: '0px 4px 10px 0px #0000001A',

  '&:hover': {
    border: '1px solid #353C4A',
  },
});

function createData(
  id: string,
  shortLink: string,
  originalLink: string,
  clicks: number,
  date: Date
) {
  return {
    id,
    shortLink: (
      <WithAdornment>
        {shortLink}
        <CopyIconWrapper>
          <CopyIcon />
        </CopyIconWrapper>
      </WithAdornment>
    ),
    originalLink,
    clicks,
    date: date.toDateString(),
    action: (
      <StyledIconButton>
        <DeleteIcon />
      </StyledIconButton>
    ),
  };
}

export default HistoryTable;
