import { Sequelize } from 'sequelize';
import config from './config.json' assert { type: "json" };

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('DB_s installed.');
  })
  .catch((err) => {
    console.error('DB Error:', err);
  });

export default sequelize;
