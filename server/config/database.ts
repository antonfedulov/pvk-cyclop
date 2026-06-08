import { Sequelize } from 'sequelize';

const host = process.env.DB_HOST ?? 'host.docker.internal';
const password = process.env.DB_PASSWORD ?? '';
const name = process.env.DB_NAME ?? '';
const user = process.env.DB_USER ?? '';
const port = process.env.DB_PORT ?? '3306';

export const sequelize = new Sequelize(name, user, password, {
  host,
  port: +port,
  dialect: 'mysql'
});
