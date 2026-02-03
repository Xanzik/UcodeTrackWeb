import { Sequelize } from 'sequelize';
import config from './config.json' with { type: 'json' };

const sequelizeDB = new Sequelize(
	config.database,
	config.user,
	config.password,
	{
		host: config.host,
		dialect: 'mysql',
	},
);

async function initDatabase() {
	try {
		await sequelizeDB.authenticate();
		console.log(
			'Connection to MySQL server has been established successfully.',
		);
		await sequelizeDB.query(
			`CREATE DATABASE IF NOT EXISTS ${config.database}`,
		);
		console.log('Database has been created or already exists.');
		await sequelizeDB.query(`USE ${config.database}`);
		console.log('Using the database:', config.database);
	} catch (error) {
		console.error('Unable to connect to MySQL server:', error);
	}
}

await initDatabase();

sequelizeDB
	.sync()
	.then(() => {
		console.log('DB_s installed.');
	})
	.catch((err) => {
		console.error('DB Error:', err);
	});

export default sequelizeDB;
