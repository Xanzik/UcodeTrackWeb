import AdminJS from 'adminjs';
import * as AdminJSSequelize from '@adminjs/sequelize';
import AdminJSExpress from '@adminjs/express';

import User from '../models/User.js';
import Post from '../models/Post.js';
import Like from '../models/Like.js';
import Comment from '../models/Comment.js';
import Category from '../models/Category.js';
import authService from '../service/authService.js';

const authenticate = async (email, password) => {
	try {
		const info = await authService.login({ email, password });
		return {
			email: info.user.email,
			role: info.user.role,
		};
	} catch (error) {
		console.log(error);
	}
};

AdminJS.registerAdapter({
	Resource: AdminJSSequelize.Resource,
	Database: AdminJSSequelize.Database,
});

const adminOptions = {
	resources: [User, Post, Like, Comment, Category],
};

export const admin = new AdminJS(adminOptions);

export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
	admin,
	{
		authenticate,
		cookiePassword: 'some-secret-password',
		jwtCookieName: 'adminjs-token',
	},
	null,
	{
		resave: false,
		saveUninitialized: true,
	},
);
