// models/category.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

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
		createdAt: {
			type: DataTypes.DATE,
			field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updated_at',
		},
	},
	{ timestamps: true },
);

Category.associate = (models) => {
	Category.belongsToMany(models.Post, {
		through: 'post_categories',
		foreignKey: 'categoryId',
		otherKey: 'postId',
		as: 'posts',
	});
};

export default Category;
