import AdminJS from "adminjs";
import * as AdminJSSequelize from "@adminjs/sequelize";
import AdminJSExpress from "@adminjs/express";

import User from "./models/User_s.js";
import Post from "./models/Post_s.js";
import Like from "./models/Like_s.js";
import Comment from "./models/Comment_s.js";
import Category from "./models/Category_s.js";

import userService from "../service/user-service.js";

const authenticate = async (email, password) => {
  try {
    const info = await userService.login({ email, password });
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
    cookiePassword: "some-secret-password",
    jwtCookieName: "adminjs-token",
  },
  null
);
