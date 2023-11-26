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
