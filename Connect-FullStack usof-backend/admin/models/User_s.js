import { DataTypes } from 'sequelize';
import sequelize from '../../utils/db_s.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  login: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  full_name: {
    type: DataTypes.STRING(255),
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  profile_picture: {
    type: DataTypes.STRING(255),
  },
  rating: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
  activate: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
  activation_link: {
    type: DataTypes.TEXT,
  },
  reset_link: {
    type: DataTypes.TEXT,
  },
  refresh_token: {
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
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
});

await User.sync();

export default User;
