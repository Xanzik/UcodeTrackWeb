import { Op } from 'sequelize';

export const buildPostWhere = (filters, search, user) => {
	const where = {};
	where.updated_at = {
		[Op.gte]: filters.dateFrom || new Date('1970-01-01'),
		[Op.lte]: filters.dateTo || new Date('3000-01-01'),
	};
	if (search) {
		where.title = {
			[Op.like]: `%${search}%`,
		};
	}
	if (filters.status && user.role === 'admin') {
		where.status = filters.status;
	} else {
		where[Op.or] = [
			{ status: 'active' },
			...(user?.id ? [{ status: 'inactive', authorId: user.id }] : []),
		];
	}
	return where;
};
