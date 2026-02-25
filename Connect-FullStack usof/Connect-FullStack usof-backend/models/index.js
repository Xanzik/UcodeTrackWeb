import User from './user.model.js';
import Post from './post.model.js';
import Category from './category.model.js';
import Comment from './comment.model.js';
import Like from './like.model.js';
import PostCategory from './post-category.model.js';

const models = {
	User,
	Post,
	Comment,
	Category,
	Like,
	PostCategory,
};

Object.values(models).forEach((model) => {
	if (typeof model.associate === 'function') {
		model.associate(models);
	}
});

export default models;
