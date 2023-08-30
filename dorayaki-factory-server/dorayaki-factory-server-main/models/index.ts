import { Sequelize } from 'sequelize';

import { config } from '../db/config';

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: 'mysql',
});

export default sequelize;
