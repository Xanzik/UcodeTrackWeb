import User from './User_s.js';
import Post from './Post_s.js';
import Category from './Category_s.js';
import Comment from './Comment_s.js';
import Like from './Like_s.js';

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
