import { Sequelize } from 'sequelize';

const port = process.env.DB_PORT ?? '';
const host = process.env.DB_HOST ?? '';
const password = process.env.DB_PASSWORD ?? '';
const name = process.env.DB_NAME ?? '';
const user = process.env.DB_USER ?? '';

export const sequelize = new Sequelize(name, user, password, {
  host,
  port: +port,
  dialect: 'mysql'
});
