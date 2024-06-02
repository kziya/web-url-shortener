import {
  Button,
  CircularProgress,
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
import React, { useEffect, useMemo, useState } from 'react';
import { CopyIcon, DeleteIcon } from '../../../icons';
import { useShortUrl } from '../../../short-url/ShortUrlContext';
import { useAuth } from '../../../auth/AuthContext';
import { toast } from 'react-toastify';

interface RowData {
  id: string;
  shortLink: string;
  originalLink: string;
  clicks: number;
  date: Date;
}

interface CreateData {
  data: RowData;
  handleCopy: (url: string) => void;
  handleDelete: (id: string) => void;
}

const createData = ({
  data: { clicks, date, id, originalLink, shortLink },
  handleCopy,
  handleDelete,
}: CreateData) => {
  return {
    id,
    shortLink: (
      <WithAdornment>
        {shortLink}
        <CopyIconWrapper onClick={() => handleCopy(shortLink)}>
          <CopyIcon />
        </CopyIconWrapper>
      </WithAdornment>
    ),
    originalLink,
    clicks,
    date: date.toDateString(),
    action: (
      <StyledIconButton onClick={() => handleDelete(id)}>
        <DeleteIcon />
      </StyledIconButton>
    ),
  };
};

const HistoryTable = () => {
  const { urlsList, urlListLoading, deleteUrl } = useShortUrl();
  const { authData } = useAuth();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const updateWidth = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.info(`${url} was copied to clipboard`);
  };

  const rows = useMemo(() => {
    const maxSymbolsCount = (60 * screenWidth) / 1920;
    return urlsList.map((item) =>
      createData({
        data: {
          id: item._id,
          shortLink: item.shortUrl,
          originalLink:
            item.url.length > maxSymbolsCount
              ? `${item.url.slice(0, maxSymbolsCount)}...`
              : item.url,
          clicks: item.clickCount,
          date: item.expiresAt,
        },
        handleCopy,
        handleDelete: deleteUrl,
      })
    );
  }, [urlsList, screenWidth]);

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
            {urlListLoading ? (
              <StyledTableBodyRow>
                <TableCell colSpan={5}>
                  <LoaderWrapper>
                    <CircularProgress />
                  </LoaderWrapper>
                </TableCell>
              </StyledTableBodyRow>
            ) : rows.length ? (
              rows.map((row) => (
                <StyledTableBodyRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.shortLink}
                  </TableCell>
                  <TableCell>{row.originalLink}</TableCell>
                  <TableCell>{row.clicks}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell align="right">{row.action}</TableCell>
                </StyledTableBodyRow>
              ))
            ) : (
              <StyledTableBodyRow>
                <TableCell colSpan={5}>
                  <LoaderWrapper>
                    Click "Shorten now!" to add your first url
                  </LoaderWrapper>
                </TableCell>
              </StyledTableBodyRow>
            )}
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

  '& .MuiTableCell-root:first-of-type': {
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

const LoaderWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const mockRows = [
  createData({
    data: {
      id: 'id-1',
      shortLink: 'test1.com',
      originalLink: 'original1.com',
      clicks: 3,
      date: new Date('2023-10-10'),
    },
    handleCopy: () => null,
    handleDelete: () => null,
  }),
  createData({
    data: {
      id: 'id-2',
      shortLink: 'test2.com',
      originalLink: 'original2.com',
      clicks: 1,
      date: new Date('2023-10-10'),
    },
    handleCopy: () => null,
    handleDelete: () => null,
  }),
  createData({
    data: {
      id: 'id-3',
      shortLink: 'test3.com',
      originalLink: 'original3.com',
      clicks: 4,
      date: new Date('2023-10-10'),
    },
    handleCopy: () => null,
    handleDelete: () => null,
  }),
  createData({
    data: {
      id: 'id-4',
      shortLink: 'test4.com',
      originalLink: 'original4.com',
      clicks: 8,
      date: new Date('2023-10-10'),
    },
    handleCopy: () => null,
    handleDelete: () => null,
  }),
  createData({
    data: {
      id: 'id-5',
      shortLink: 'test5.com',
      originalLink: 'original5.com',
      clicks: 35,
      date: new Date('2023-10-10'),
    },
    handleCopy: () => null,
    handleDelete: () => null,
  }),
];

export default HistoryTable;
