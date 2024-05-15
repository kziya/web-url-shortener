import { Typography, styled } from '@mui/material';
import React, { useState } from 'react';
import { ChartIcon, ClockIcon, SettingsIcon } from '../../../icons';

enum MainPageTab {
  history = 'History',
  statistics = 'Statistics',
  settings = 'Settings',
}

const tabs = [
  {
    title: MainPageTab.history,
    icon: <ClockIcon />,
  },
  {
    title: MainPageTab.statistics,
    icon: <ChartIcon />,
  },
  {
    title: MainPageTab.settings,
    icon: <SettingsIcon />,
  },
];

const MainTabs = () => {
  const [activeTab, setActiveTab] = useState(MainPageTab.history);

  return (
    <OuterWrapper>
      {tabs.map((tab) => (
        <Tab
          key={tab.title}
          active={tab.title === activeTab}
          onClick={() => setActiveTab(tab.title)}
        >
          {tab.icon}
          <TabText>{tab.title}</TabText>
        </Tab>
      ))}
    </OuterWrapper>
  );
};

const OuterWrapper = styled('div')({
  width: '540px',
  margin: '19px auto 3px',
  maxWidth: '70%',
  boxShadow: '0px 4px 10px 0px #0000001A',
  background: '#00153D',
  borderRadius: '200px',
  padding: '0 33px',
  display: 'flex',
  justifyContent: 'center',
  height: '70px',
});

const Tab = styled('div')<{ active: boolean }>(({ active }) => ({
  width: '33%',
  display: 'flex',
  alignItems: 'center',
  columnGap: '10px',
  justifyContent: 'center',
  position: 'relative',
  cursor: 'pointer',

  ...(active
    ? {
        '&:after': {
          content: '""',
          position: 'absolute',
          left: 0,
          bottom: 0,
          right: 0,
          height: '2px',
          background: '#144EE3',
        },
      }
    : {}),
}));

const TabText = styled(Typography)({
  color: '#fff',
  fontSize: '15px',
  fontWeight: 700,
});

export default MainTabs;
