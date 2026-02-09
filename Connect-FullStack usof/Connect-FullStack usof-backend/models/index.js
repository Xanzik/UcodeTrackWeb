import User from './User.js';
import Post from './Post.js';
import Category from './Category.js';
import Comment from './Comment.js';
import Like from './Like.js';

const models = {
	User,
	Post,
	Comment,
	Category,
	Like,
};

Object.values(models).forEach((model) => {
	if (typeof model.associate === 'function') {
		model.associate(models);
	}
});

export default models;
