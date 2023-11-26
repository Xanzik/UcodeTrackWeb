import $api from "../http";

export default class PostService {
  static async createPost(title, content, categories) {
    return $api.post("posts", { title, content, categories });
  }

  static async getPosts(filters) {
    return $api.get("posts", { params: filters });
  }
}
