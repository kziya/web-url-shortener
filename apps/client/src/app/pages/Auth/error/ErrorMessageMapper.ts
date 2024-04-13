import { AuthErrorMessages } from './ErrorMessages';

const DEFAULT_ERROR_TEXT = 'Something went wrong, please try again later';

const AuthErrorMessageMapper: { [key: string]: string } = {
  [AuthErrorMessages.emailOrPasswordIsNotValid]:
    'Email or password is not valid',

  [AuthErrorMessages.userAlreadyExists]: 'User already exists with this email',
  [AuthErrorMessages.userNotExists]: 'User with this email does not exist',
};

export const getAuthErrorText = (errorMessage: string): string => {
  const errorText = AuthErrorMessageMapper[errorMessage];

  if (!errorText) {
    return DEFAULT_ERROR_TEXT;
  }

  return errorText;
};
