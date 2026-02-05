// models/Category.js
import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const Category = sequelize.define(
	'Category',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
		},
	},
	{ timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' },
);

export default Category;
