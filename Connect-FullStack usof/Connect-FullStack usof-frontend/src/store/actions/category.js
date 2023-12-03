import CategoryService from "../../services/CategoryService.js";

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const response = await CategoryService.getCategories();
      dispatch({
        type: "GET_CATEGORIES_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error getting categories:", error);
      dispatch({
        type: "GETTING_CATEGORIES_FAILURE",
        payload: error,
      });
    }
  };
};

export const getCategoriesForPost = (id) => {
  return async (dispatch) => {
    try {
      const response = await CategoryService.getCategoriesForPost(id);
      dispatch({
        type: "GET_POST_CATEGORIES_SUCCESS",
        payload: response.data,
      });
      return response;
    } catch (error) {
      console.error("Error getting categories:", error);
      dispatch({
        type: "GETTING_POST_CATEGORIES_FAILURE",
        payload: error,
      });
    }
  };
};
