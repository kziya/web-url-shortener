import { styled } from '@mui/material';

const AccountSettings = () => {
  return (
    <SettingsContainer>
      <SettingsTitle>Name</SettingsTitle>
      <SettingsInput placeholder="Alex" />
    </SettingsContainer>
  );
};

const SettingsContainer = styled('div')({
  position: 'relative',
  width: '100%',
  height: '75px',
  marginTop: '70px',
});

const SettingsTitle = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '21px',
  fontFamily: 'Proxima Nova',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '21px',
  display: 'flex',
  alignItems: 'center',
  color: '#1A1A1A',
  top: '3px',
});

const SettingsInput = styled('input')({
  boxSizing: 'border-box',
  position: 'absolute',
  height: '46px',
  width: '100%',
  top: '29px',
  background: '#FFFFFF',
  border: '1px solid #B2B2B2',
  borderRadius: '8px',
  paddingLeft: '15px',
  fontFamily: 'Proxima Nova',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  color: '#1A1A1A',
});

export default AccountSettings;

