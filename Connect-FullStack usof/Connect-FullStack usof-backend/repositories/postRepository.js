import models from '../admin/models/index.js';

const PostModel = models.Post;

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
