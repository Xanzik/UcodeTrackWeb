import sequelize from './db.js';
import '../models/index.js';

export async function initDB() {
	await sequelize.authenticate();
	await sequelize.sync();
}
