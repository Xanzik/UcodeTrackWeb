// models/post.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Post = sequelize.define(
	'Post',
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
		status: {
			type: DataTypes.ENUM('active', 'inactive'),
			defaultValue: 'active',
		},
		authorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id',
			},
			field: 'author_id',
			onDelete: 'SET NULL',
		},
		isBlocked: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			field: 'is_blocked',
		},
		content: {
			type: DataTypes.TEXT,
		},
		screenshot: {
			type: DataTypes.STRING(255),
		},
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
);

Post.associate = (models) => {
	Post.belongsTo(models.User, {
		foreignKey: 'authorId',
		as: 'author',
		onDelete: 'SET NULL',
	});

	Post.hasMany(models.Comment, {
		foreignKey: 'postId',
		as: 'comments',
		onDelete: 'CASCADE',
	});

	Post.belongsToMany(models.Category, {
		through: 'post_categories',
		foreignKey: 'postId',
		otherKey: 'categoryId',
		as: 'categories',
	});
};

export default Post;
