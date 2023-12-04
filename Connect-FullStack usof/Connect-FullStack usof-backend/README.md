# USOF Backend Documentation

## Introduction

Welcome to the documentation for the USOF (User StackOverflow) backend. This API is designed to support a question and answer service for professional and enthusiast programmers, promoting knowledge exchange and collaboration.

### Short Description

USOF allows users to register, view posts, like, and comment on them. It serves as the foundation for a future question and answer website.

## Requirements and Dependencies

Before building and running the USOF backend project, make sure your development environment meets the following requirements:

### Software Requirements:

**Visual Studio Code (VSCode):**

- Install Visual Studio Code as your integrated development environment.

**Node.js:**

- Install Node.js to run JavaScript on the server.
- Verify the installation by running the following commands in your terminal:
  ```bash
  node --version
  npm --version
  ```

### Project Dependencies:

Ensure the following project-specific dependencies are installed. Navigate to the project directory using your terminal and run the following command:

bash
Copy code
npm install

This will install the required packages and dependencies specified in the project's package.json file.

Now you're ready to build and run the USOF backend project. Follow the instructions in the "How to Run the Solution" section of the documentation.

## How to Run the Solution

Follow these steps to clone the repository and run the USOF backend on your local machine:

### Clone the repository:

bash
Copy code
git clone https://github.com/Xanzik/UcodeTrackWeb/tree/main/Connect-FullStack%20usof/Connect-FullStack%20usof-backend

### Navigate to the project directory:

bash
Copy code
cd Connect-FullStack%20usof-backend

### Install dependencies:

bash
Copy code
npm i

### Build the project:

bash
Copy code
node index.js or npm run dev

## Algorithm Overview

The USOF backend follows an MVC pattern, emphasizing OOP paradigm and SOLID principles. Entities include User, Post, Category, Comment, and Like, each with specific fields and functionalities.

- ## Authentication module:
  –POST - /api/auth/register- registration of a new user, required parameters are[login, password, password confirmation, email]
  –POST - /api/auth/login- log in user, required parameters are [login, email,password]. Only users with a confirmed email can sign in
  –POST - /api/auth/logout- log out authorized user
  –POST - /api/auth/password-reset- send a reset link to user email, required parameter is [email]
  –POST - /api/auth/password-reset/<confirm_token>- confirm new password with a token from email, required parameter is a [new password]
- ## User module:

  –GET - /api/users- get all users
  –GET - /api/users/<user_id>- get specified user data
  –POST - /api/users- create a new user, required parameters are [login, password,password confirmation, email, role]. This feature must be accessible only for admins
  –PATCH - /api/users/avatar- upload user avatar
  –PATCH - /api/users/<user_id>- update user data
  –DELETE - /api/users/<user_id>- delete user

- ## Post module:
  –GET - /api/posts- get all posts.This endpoint doesn't require any role, it is public. If there are too many posts, you must implement pagination. Page size is up to you
  –GET - /api/posts/<post_id>- get specified post data.Endpoint is public
  –GET - /api/posts/<post_id>/comments- get all comments for the specified post.Endpoint is public
  –POST - /api/posts/<post_id>/comments- create a new comment, required parameters [content]
  –GET - /api/posts/<post_id>/categories- get all categories associated with the specified post
  –GET - /api/posts/<post_id>/like- get all likes under the specified post
  –POST - /api/posts/- create a new post, required parameters are [title, content,categories]
  –POST - /api/posts/<post_id>/like- create a new like under a post
  –PATCH - /api/posts/<post_id>- update the specified post (its title, body or category). It's accessible only for the creator of the post
  –DELETE - /api/posts/<post_id>- delete a post
  –DELETE - /api/posts/<post_id>/like- delete a like under a post

* ## Categories module:
  –GET - /api/categories- get all categories
  –GET - /api/categories/<category_id>- get specified category data
  –GET - /api/categories/<category_id>/posts- get all posts associated with the specified category
  –POST - /api/categories- create a new category, required parameter is [title]
  –PATCH - /api/categories/<category_id>- update specified category data
  –DELETE - /api/categories/<category_id>- delete a category
* ## Comments module:
  –GET - /api/comments/<comment_id>- get specified comment data
  –GET - /api/comments/<comment_id>/like- get all likes under the specified comment
  –POST - /api/comments/<comment_id>/like- create a new like under a comment
  –PATCH - /api/comments/<comment_id>- update specified comment data
  –DELETE - /api/comments/<comment_id>- delete a comment
  –DELETE - /api/comments/<comment_id>/like- delete a like under a comment

# Conclusion

Thank you for exploring the USOF backend documentation. Feel free to reach out for any questions or further assistance. Happy coding!
