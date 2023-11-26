// models/Post.js
import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const Post = sequelize.define('Post', {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active',
  },
  author_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  isBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  Content: {
    type: DataTypes.TEXT,
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

Post.associate = (models) => {
  Post.belongsTo(models.User, { foreignKey: 'AuthorID', as: 'author' });
};

await Post.sync();

export default Post;
