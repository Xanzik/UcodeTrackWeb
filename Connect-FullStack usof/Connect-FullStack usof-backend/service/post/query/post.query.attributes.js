import { literal } from 'sequelize';

export const buildPostAttributes = () => ({
	include: [
		[
			literal(`(
        SELECT COUNT(*)
        FROM \`Comments\` AS c
        WHERE c.\`post_id\` = \`Post\`.\`id\`
      )`),
			'commentsCount',
		],
		[
			literal(`(
        SELECT COUNT(*)
        FROM \`Likes\` AS r
        WHERE r.\`post_id\` = \`Post\`.\`id\` AND r.\`type\`='like'
      )`),
			'likesCount',
		],
		[
			literal(`(
        SELECT COUNT(*)
        FROM \`Likes\` AS r
        WHERE r.\`post_id\` = \`Post\`.\`id\` AND r.\`type\`='dislike'
      )`),
			'dislikesCount',
		],
	],
});
