import AdminJS from 'adminjs';
import * as AdminJSSequelize from '@adminjs/sequelize';
import AdminJSExpress from '@adminjs/express';

import authService from '../service/auth.service.js';

import models from '../models/index.js';

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
	resources: [
		models.User,
		models.Post,
		models.Like,
		models.Comment,
		models.Category,
	],
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
