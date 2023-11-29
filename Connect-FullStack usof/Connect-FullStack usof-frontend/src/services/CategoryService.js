import $api from "../http";

export default class CategoryService {
  static async getCategories() {
    return $api.get("categories");
  }
}
