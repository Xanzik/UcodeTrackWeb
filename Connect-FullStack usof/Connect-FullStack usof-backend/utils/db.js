import mysql from 'mysql2/promise';
import config from './config.json' with { type: 'json' };

let pool = mysql.createPool(config);

export default pool;
