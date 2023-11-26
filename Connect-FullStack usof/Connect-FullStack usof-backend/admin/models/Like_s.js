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
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  PostID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Posts',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  CommentID: {
    type: DataTypes.INTEGER,
    onDelete: 'CASCADE',
    references: {
      model: 'Comments',
      key: 'id',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
  },
});

Like.associate = (models) => { 
  Like.belongsTo(models.User, { foreignKey: 'AuthorID', as: 'author', onDelete: 'CASCADE' });
  Like.belongsTo(models.Post, { foreignKey: 'PostID', as: 'post', onDelete: 'CASCADE' });
  Like.belongsTo(models.Comment, { foreignKey: 'CommentID', as: 'comment', onDelete: 'CASCADE' });
};

await Like.sync();

export default Like;
