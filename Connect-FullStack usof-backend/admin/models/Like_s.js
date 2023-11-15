// models/Like.js
import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const Like = sequelize.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  EntityID: {
    type: DataTypes.INTEGER,
  },
  EntityType: {
    type: DataTypes.ENUM('post', 'comment'),
    defaultValue: 'post',
  },
  Type: {
    type: DataTypes.ENUM('like', 'dislike'),
    defaultValue: 'like',
  },
});

Like.associate = (models) => {
  Like.belongsTo(models.User, { foreignKey: 'AuthorID', as: 'author' });
};

Like.sync();

export default Like;
