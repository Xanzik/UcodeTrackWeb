import $api from "../http";

export default class CategoryService {
  static async getCategories() {
    return $api.get("categories");
  }

  static async getCategoriesForPost(id) {
    return $api.get(`posts/${id}/categories`);
  }
}
