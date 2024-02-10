import { DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const databaseConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.host,
  port: parseInt(process.env.port, 10),
  username: process.env.username,
  password: process.env.password,
  database: process.env.database,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: false,
};
