import PostService from "../../services/PostService";

export const createPost = (title, content, categories) => {
  return async (dispatch) => {
    try {
      const response = await PostService.createPost(title, content, categories);
      dispatch({
        type: "CREATE_POST_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating post:", error);
      dispatch({
        type: "CREATE_POST_FAILURE",
        payload: error,
      });
    }
  };
};

export const getPosts = (filters) => {
  return async (dispatch) => {
    try {
      const response = await PostService.getPosts(filters);
      dispatch({
        type: "GET_POSTS_SUCCESS",
        payload: response.data.posts,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      dispatch({
        type: "GET_POSTS_FAILURE",
        payload: error,
      });
    }
  };
};

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const response = await PostService.getPost(id);
      dispatch({
        type: "GET_POST_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      dispatch({
        type: "GET_POST_FAILURE",
        payload: error,
      });
    }
  };
};

export const updatePost = (id, updatedContent, updatedCategories) => {
  return async (dispatch) => {
    try {
      const response = await PostService.updatePost(
        id,
        updatedContent,
        updatedCategories
      );
      dispatch({
        type: "UPDATE_POST_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      dispatch({
        type: "UPDATE_POST_FAILURE",
        payload: error,
      });
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      await PostService.deletePost(id);
      dispatch({
        type: "DELETE_POST_SUCCESS",
        payload: id,
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      dispatch({
        type: "DELETE_POST_FAILURE",
        payload: error,
      });
    }
  };
};
