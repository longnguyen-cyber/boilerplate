export enum TOKEN_KEY_NAME {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

const minute = 1000 * 60;
const hour = minute * 60;

export enum TOKEN_EXPIRED_TIME {
  ACCESS_TOKEN = minute * 30,
  REFRESH_TOKEN = hour * 24 * 30,
}
