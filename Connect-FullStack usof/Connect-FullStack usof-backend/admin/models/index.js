import Post from './Post_s.js';
import Category from './Category_s.js';

Post.belongsToMany(Category, {
	through: 'post_categories',
	foreignKey: 'post_id',
	otherKey: 'category_id',
});

Category.belongsToMany(Post, {
	through: 'post_categories',
	foreignKey: 'category_id',
	otherKey: 'post_id',
});

export { Post, Category };
