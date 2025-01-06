export enum SUCCESS_MESSAGE {
  //module auth
  LOGIN = 'Login successfully',
  LOGOUT = 'Logout successfully',
  REGISTER = 'Register successfully',
  USER_UPDATE_SUCCESS = 'User updated successfully',
  USER_DETAIL_SUCCESS = 'Get user detail successfully',
}

export enum ERROR_MESSAGE {
  INVALID_CREDENTIAL = 'Invalid credentials',
  METHOD_NOT_ALLOWED = 'Method Not Allowed',

  USER_NOT_EXIST = 'User does not exist',
  USER_EXISTED = 'User existed',
  USER_UNAUTHORIZED = 'User Unauthorized',
  INCORRECT_EMAIL_PASSWORD = 'Incorrect email or password',
  INCORRECT_PHONE_FORMAT = 'Phone number must be 10 digits',
  INCORRECT_EMAIL_FORMAT = 'Email is not valid',
  INCORRECT_PASSWORD_FORMAT = 'Password must be at least 8 characters, including uppercase, lowercase, number and special character',
}
