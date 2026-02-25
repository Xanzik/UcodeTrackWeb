import { literal } from 'sequelize';

export const buildPostOrder = (filters) => {
	const order = [];
	if (filters.sortBy === 'likes') {
		order.push([
			literal(`(
            SELECT COUNT(*)
            FROM likes AS like
            WHERE like.PostID = Post.id
          )`),
			'DESC',
		]);
	} else {
		order.push(['updated_at', 'DESC']);
	}
	return order;
};
