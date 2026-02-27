import { Op } from 'sequelize';

export const buildPostInclude = (filters, CategoryModel, UserModel) => {
	const categories =
		typeof filters.category === 'string'
			? filters.category
					.split(',')
					.map((c) => c.trim())
					.filter(Boolean)
			: Array.isArray(filters.category)
				? filters.category
				: [];
	return [
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
		...(categories.length
			? [
					{
						model: CategoryModel,
						as: 'filterCategories',
						attributes: [],
						where: { title: { [Op.in]: categories } },
						through: { attributes: [] },
					},
				]
			: []),
	];
};
