import { Post as PostModel } from '../admin/models/index.js';

class PostRepository {
	async findById(id, include = {}) {
		return await PostModel.findByPk(id, include);
	}

	async delete(id) {
		return await PostModel.destroy({
			where: { id: Number(id) },
		});
	}
}

export default new PostRepository();
