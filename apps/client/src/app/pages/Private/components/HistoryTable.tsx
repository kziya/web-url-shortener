import {
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
import { CopyIcon, DeleteIcon, RefreshIcon } from '../../../icons';
import { useShortUrl } from '../../../short-url/ShortUrlContext';
import { useAuth } from '../../../auth/AuthContext';
import { toast } from 'react-toastify';
import { ShortUrlStatus } from '@web-url-shortener/domain';
import { useInView } from 'react-intersection-observer';

interface RowData {
  id: string;
  shortLink: string;
  originalLink: string;
  clicks?: number;
  date: Date;
}

interface CreateData {
  data: RowData;
  handleCopy: (url: string) => void;
  handleDelete: (id: string) => void;
  handleRenew: (id: string) => void;
}

const createData = ({
  data: { clicks, date, id, originalLink, shortLink },
  handleCopy,
  handleDelete,
  handleRenew,
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
      <>
        <StyledIconButton onClick={() => handleRenew(id)}>
          <RefreshIcon />
        </StyledIconButton>
        <StyledIconButton onClick={() => handleDelete(id)}>
          <DeleteIcon />
        </StyledIconButton>
      </>
    ),
  };
};

const HistoryTable = () => {
  const {
    urlsList,
    urlListLoading,
    deleteUrl,
    renewPrivateUrl,
    hasMoreUrls,
    getUrlsList,
    newUrlsLoading,
  } = useShortUrl();
  const { authData } = useAuth();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

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
    toast.success('Url was copied to clipboard');
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
          clicks: authData?.user ? item.clickCount : undefined,
          date: item.expiresAt,
        },
        handleCopy,
        handleDelete: deleteUrl,
        handleRenew: renewPrivateUrl,
      })
    );
  }, [urlsList, screenWidth, authData?.user, deleteUrl, renewPrivateUrl]);

  useEffect(() => {
    if (!authData?.user) return;
    getUrlsList('', 'active' as ShortUrlStatus);
  }, []);

  useEffect(() => {
    if (inView) {
      handleInView();
    }
  }, [inView]);

  const handleInView = () => {
    if (!hasMoreUrls) return;
    const lastId = urlsList[urlsList.length - 1]._id;
    getUrlsList(lastId, 'active' as ShortUrlStatus);
  };

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
              <>
                {rows.map((row, index) => (
                  <StyledTableBodyRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.shortLink}
                    </TableCell>
                    <TableCell>{row.originalLink}</TableCell>
                    <TableCell style={{ minWidth: '115px' }}>
                      {row.clicks === undefined ? 'not available' : row.clicks}
                    </TableCell>
                    <TableCell style={{ minWidth: '140px' }}>
                      {row.date}
                    </TableCell>
                    <TableCell align="right" style={{ minWidth: '110px' }}>
                      {authData?.user ? row.action : 'not available'}
                    </TableCell>
                  </StyledTableBodyRow>
                ))}
                <span ref={ref} />
              </>
            ) : (
              <StyledTableBodyRow>
                <TableCell colSpan={5}>
                  <LoaderWrapper>
                    Click "Shorten now!" to add your first url
                  </LoaderWrapper>
                </TableCell>
              </StyledTableBodyRow>
            )}
            {newUrlsLoading && (
              <StyledTableBodyRow>
                <TableCell colSpan={5}>
                  <LoaderWrapper>
                    <CircularProgress />
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

const StyledPaper = styled(Paper)({
  background: 'transparent',
  boxShadow: 'none',
  overflowY: 'auto',
  maxHeight: '500px',

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

  '&::-webkit-scrollbar': {
    height: '10px',
    background: 'transparent',
  },

  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#0D1117',
    borderRadius: '4px',
    backgroundClip: 'padding-box',
    border: '3px solid transparent',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundColor: '#555',
  },
  '&::-webkit-scrollbar-corner': {
    backgroundColor: 'transparent',
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

  '& svg': {
    width: '20px',
    height: '20px',
    fill: '#fff',
  },
});

const LoaderWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export default HistoryTable;
