import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  type: process.env.DATABASE_CONNECTION,
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  timezone: 'Z',
  logging: process.env.DATABASE_LOGGING === 'true' ? true : ['error'],
  autoLoadEntities: true,
  keepConnectionAlive: true,
  entities: [`${__dirname}/**/*.entity{.ts,.js}`],
  extra: {
    connectionLimit: parseInt(
      process.env.DATABASE_CONNECTION_LIMIT || '10',
      10,
    ),
  },
}));
