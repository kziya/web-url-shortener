import { styled } from '@mui/material';
import profileImage from 'apps/client/src/assets/Image.png';

const ProfileContainer = styled('div')`
  position: fixed;
  top: 170px;
  left: 162px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
`;
const ProfileImage = styled('img')`
  width: 150px;
  height: 150px;
  border-radius: 50%;
`;

const ProfileSection = () => {
  return (
    <ProfileContainer>
      <ProfileImage src={profileImage} alt="Profile" />
    </ProfileContainer>
  );
};

export default ProfileSection;
