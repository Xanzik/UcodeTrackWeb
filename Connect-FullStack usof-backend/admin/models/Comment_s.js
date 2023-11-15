// models/Comment.js
import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Content: {
    type: DataTypes.TEXT,
  },
});

Comment.associate = (models) => {
  Comment.belongsTo(models.Post, { foreignKey: 'PostID', as: 'post', onDelete: 'CASCADE' });
  Comment.belongsTo(models.User, { foreignKey: 'AuthorID', as: 'author' });
};

Comment.sync();

export default Comment;
