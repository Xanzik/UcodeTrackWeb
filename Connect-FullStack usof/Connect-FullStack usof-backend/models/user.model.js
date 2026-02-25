import { DataTypes } from 'sequelize';
import sequelize from '../db/db.js';

const User = sequelize.define(
	'User',
	{
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
		fullName: {
			type: DataTypes.STRING(255),
			field: 'full_name',
		},
		email: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		profilePicture: {
			type: DataTypes.STRING(255),
			field: 'profile_picture',
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
		activationLink: {
			type: DataTypes.TEXT,
			field: 'activation_link',
		},
		resetLink: {
			type: DataTypes.TEXT,
			field: 'reset_link',
		},
		refreshToken: {
			type: DataTypes.TEXT,
			field: 'refresh_token',
		},
		createdAt: {
			type: DataTypes.DATE,
			field: 'created_at',
		},
		updatedAt: {
			type: DataTypes.DATE,
			field: 'updated_at',
		},
	},
	{
		scopes: {
			public: {
				attributes: [
					'id',
					'login',
					'full_name',
					'email',
					'profile_picture',
					'rating',
					'role',
				],
			},
		},
		timestamps: true,
	},
);

export default User;
