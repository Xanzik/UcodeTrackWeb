import sequelize from '../db/db.js';
import { DataTypes } from 'sequelize';

const PostCategory = sequelize.define(
	'post_categories',
	{
		postId: { type: DataTypes.INTEGER, allowNull: false, field: 'post_id' },
		categoryId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'category_id',
		},
	},
	{
		timestamps: false,
	},
);

export default PostCategory;
