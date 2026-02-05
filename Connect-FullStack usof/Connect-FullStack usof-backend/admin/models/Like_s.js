import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const Like = sequelize.define(
	'Like',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		type: {
			type: DataTypes.ENUM('like', 'dislike'),
			defaultValue: 'like',
		},
		authorId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'Users',
				key: 'id',
			},
			field: 'author_id',
			onDelete: 'CASCADE',
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
		commentId: {
			type: DataTypes.INTEGER,
			onDelete: 'CASCADE',
			references: {
				model: 'Comments',
				key: 'id',
			},
			field: 'comment_id',
		},
	},
	{
		timestamps: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
);

Like.associate = (models) => {
	Like.belongsTo(models.User, {
		foreignKey: 'author_id',
		as: 'author',
		onDelete: 'CASCADE',
	});
	Like.belongsTo(models.Post, {
		foreignKey: 'post_id',
		as: 'post',
		onDelete: 'CASCADE',
	});
	Like.belongsTo(models.Comment, {
		foreignKey: 'comment_id',
		as: 'comment',
		onDelete: 'CASCADE',
	});
};

export default Like;
