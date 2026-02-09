import { Sequelize } from 'sequelize';
import config from './config.json' with { type: 'json' };

const sequelize = new Sequelize(config.database, config.user, config.password, {
	host: config.host,
	dialect: 'mysql',
});

export default sequelize;
