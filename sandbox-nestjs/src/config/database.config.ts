import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.HOST,
  port: parseInt(process.env.PORT, 10),
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
};
