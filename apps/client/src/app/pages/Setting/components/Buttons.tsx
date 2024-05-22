import React from 'react';
import { styled } from '@mui/material';

const ActionButtonsContainer = styled('div')({
  position: 'absolute',
  width: '765px',
  height: '44px',
  left: '505px',
  top: '570px',
});

const Button = styled('button')({
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  padding: '12px 18.6719px 12px 17px',
  position: 'absolute',
  borderRadius: '40px',
  fontFamily: 'Proxima Nova',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#FFFFFF',
});

const DeleteButton = styled(Button)({
  background: '#C84545',
  border: '1px solid #C84545',
  width: '96px',
  height: '60px',
  left: '603.33px',
});

const SaveChangesButton = styled(Button)({
  background: '#0069FF',
  border: '1px solid #0069FF',
  width: '124.58px',
  height: '44px',
  left: '0px',
});

const CancelButton = styled(Button)({
  background: '#0069FF',
  border: '1px solid #0069FF',
  width: '124.58px',
  height: '44px',
  left: '132.58px',
});

const Buttons = () => {
  return (
    <ActionButtonsContainer>
      <DeleteButton>Delete Account</DeleteButton>
      <CancelButton>Cancel</CancelButton>
      <SaveChangesButton>Save Changes</SaveChangesButton>
    </ActionButtonsContainer>
  );
};

export default Buttons;

