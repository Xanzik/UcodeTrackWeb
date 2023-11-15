// models/Comment.js
import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  Content: {
    type: DataTypes.TEXT,
  },
  AuthorID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  PostID: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Posts',
      key: 'id',
    },
    onDelete: 'CASCADE',
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

Comment.associate = (models) => {
  Comment.belongsTo(models.Post, { foreignKey: 'PostID', as: 'post', onDelete: 'CASCADE' });
  Comment.belongsTo(models.User, { foreignKey: 'AuthorID', as: 'author' });
};

await Comment.sync();

export default Comment;