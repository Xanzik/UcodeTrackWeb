// models/Comment.js
import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const Comment = sequelize.define('Comment', {
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
		onDelete: 'SET NULL',
	},
	postId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Posts',
			key: 'id',
		},
		onDelete: 'CASCADE',
	},
	parentCommentId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Comments',
			key: 'id',
		},
		onDelete: 'CASCADE',
	},
	isBlocked: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
});

Comment.associate = (models) => {
	Comment.belongsTo(models.Post, {
		foreignKey: 'PostID',
		as: 'post',
		onDelete: 'CASCADE',
	});
	Comment.belongsTo(models.User, {
		foreignKey: 'AuthorID',
		as: 'author',
		onDelete: 'SET NULL',
	});
	Comment.belongsTo(models.Comment, {
		foreignKey: 'ParentCommentID',
		as: 'parentComment',
		onDelete: 'CASCADE',
	});
};

export default Comment;
