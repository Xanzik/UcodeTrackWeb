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
