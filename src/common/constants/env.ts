export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export const ENV_FILE_PATH = `./.env.${process.env.NODE_ENV || NODE_ENV.DEVELOPMENT}`;
