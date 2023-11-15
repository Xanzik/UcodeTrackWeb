import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';
import User from './User_s.js';
import Post from './Post_s.js';
import Comment from './Comment_s.js';

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Type: {
    type: DataTypes.ENUM('like', 'dislike'),
    defaultValue: 'like',
  },
  AuthorID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  PostID: {
    type: DataTypes.INTEGER,
  },
  CommentID: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
});

Like.associate = (models) => {
  Like.belongsTo(models.User, { foreignKey: 'AuthorID', as: 'author', onDelete: 'CASCADE' });
  Like.belongsTo(models.Post, { foreignKey: 'PostID', as: 'post', onDelete: 'CASCADE' });
  Like.belongsTo(models.Comment, { foreignKey: 'CommentID', as: 'comment', onDelete: 'CASCADE' });
};

await Like.sync();

export default Like;
