import { Sequelize } from 'sequelize';
import config from './config.json' assert { type: "json" };

const sequelize_db = new Sequelize('', config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
});

async function initDatabase() {
  try {
    await sequelize_db.authenticate();
    console.log('Connection to MySQL server has been established successfully.');
    await sequelize_db.query(`CREATE DATABASE IF NOT EXISTS ${config.database}`);
    console.log('Database has been created or already exists.');
    await sequelize_db.query(`USE ${config.database}`);
    console.log('Using the database:', config.database);
  } catch (error) {
    console.error('Unable to connect to MySQL server:', error);
  }
}

await initDatabase();

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
});

sequelize.sync()
  .then(() => {
    console.log('DB_s installed.');
  })
  .catch((err) => {
    console.error('DB Error:', err);
  });

export default sequelize;
