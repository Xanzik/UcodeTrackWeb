// models/comment.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const Comment = sequelize.define(
	'Comment',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		status: {
			type: DataTypes.ENUM('active', 'inactive'),
			defaultValue: 'active',
		},
		content: {
			type: DataTypes.TEXT,
		},
		authorId: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'Users',
				key: 'id',
			},
			field: 'author_id',
			onDelete: 'SET NULL',
		},
		postId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Posts',
				key: 'id',
			},
			field: 'post_id',
			onDelete: 'CASCADE',
		},
		parentCommentId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Comments',
				key: 'id',
			},
			field: 'parent_comment_id',
			onDelete: 'CASCADE',
		},
		isBlocked: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
			field: 'is_blocked',
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
	{
		timestamps: true,
	},
);

Comment.associate = (models) => {
	Comment.belongsTo(models.Post, {
		foreignKey: 'postId',
		as: 'post',
		onDelete: 'CASCADE',
	});

	Comment.belongsTo(models.User, {
		foreignKey: 'authorId',
		as: 'author',
		onDelete: 'SET NULL',
	});

	Comment.belongsTo(models.Comment, {
		foreignKey: 'parentCommentId',
		as: 'parentComment',
		onDelete: 'CASCADE',
	});

	Comment.hasMany(models.Comment, {
		foreignKey: 'parentCommentId',
		as: 'replies',
		onDelete: 'CASCADE',
	});
};

export default Comment;
