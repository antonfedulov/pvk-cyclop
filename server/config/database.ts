import { Sequelize } from 'sequelize';

const port = process.env.DB_PORT ?? '3306';
const host = process.env.DB_HOST ?? '192.168.136.4';
const password = process.env.DB_PASSWORD ?? 'cyclop121#PVK';
const name = process.env.DB_NAME ?? 'cyclope_db';
const user = process.env.DB_USER ?? 'cyclop';

export const sequelize = new Sequelize(name, user, password, {
  host,
  port: +port,
  dialect: 'mysql'
});
