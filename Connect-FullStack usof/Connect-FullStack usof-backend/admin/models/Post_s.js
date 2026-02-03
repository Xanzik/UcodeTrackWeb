// models/Post.js
import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const Post = sequelize.define('Post', {
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
		onDelete: 'SET NULL',
	},
	isBlocked: {
		type: DataTypes.BOOLEAN,
		defaultValue: false,
	},
	Content: {
		type: DataTypes.TEXT,
	},
	screenshot: {
		type: DataTypes.STRING(255),
	},
});

Post.associate = (models) => {
	Post.belongsTo(models.User, {
		foreignKey: 'AuthorID',
		as: 'author',
		onDelete: 'SET NULL',
	});
};

await Post.sync();

export default Post;
