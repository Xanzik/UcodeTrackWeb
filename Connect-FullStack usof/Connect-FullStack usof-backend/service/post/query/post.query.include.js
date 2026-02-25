import { Op } from 'sequelize';

export const buildPostInclude = (filters, CategoryModel, UserModel) => {
	const include = [
		{
			model: UserModel,
			as: 'author',
			attributes: ['id', 'login', 'profilePicture', 'rating', 'role'],
		},
		{
			model: CategoryModel,
			as: 'categories',
			attributes: ['id', 'title'],
			through: { attributes: [] },
		},
	];
	if (filters.category && filters.category.length > 0) {
		include.push({
			model: CategoryModel,
			as: 'categories',
			where: { title: { [Op.in]: filters.category } },
			through: { attributes: [] },
			required: true,
		});
	}
	return include;
};
