import PostService from "../../services/PostService.js";
import CommentService from "../../services/CommentService.js";

export const createLikePost = (id) => {
  return async (dispatch) => {
    try {
      const response = await PostService.createLikePost(id);
      dispatch({
        type: "CREATE_LIKE",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating like:", error);
      dispatch({
        type: "CREATE_LIKE_ERROR",
        payload: error,
      });
    }
  };
};

export const createDislikePost = (id) => {
  return async (dispatch) => {
    try {
      const response = await PostService.createDislikePost(id);
      dispatch({
        type: "CREATE_DISLIKE",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating dislike:", error);
      dispatch({
        type: "CREATE_DISLIKE_ERROR",
        payload: error,
      });
    }
  };
};

export const deleteLike = (id) => {
  return async (dispatch) => {
    try {
      const response = await PostService.deleteLike(id);
      dispatch({
        type: "DELETE_LIKE",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error deleting like:", error);
      dispatch({
        type: "DELETE_LIKE_ERROR",
        payload: error,
      });
    }
  };
};

export const deleteDislike = (id) => {
  return async (dispatch) => {
    try {
      const response = await PostService.deleteDisLike(id);
      dispatch({
        type: "DELETE_DISLIKE",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error deleting dislike:", error);
      dispatch({
        type: "DELETE_DISLIKE_ERROR",
        payload: error,
      });
    }
  };
};

export const createLikeComment = (commentId) => {
  return async (dispatch) => {
    try {
      const response = await CommentService.createLikeComment(commentId);
      dispatch({
        type: "CREATE_LIKE_COMMENT",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating like for comment:", error);
      dispatch({
        type: "CREATE_LIKE_COMMENT_ERROR",
        payload: error,
      });
    }
  };
};

export const createDislikeComment = (commentId) => {
  return async (dispatch) => {
    try {
      const response = await CommentService.createDislikeComment(commentId);
      dispatch({
        type: "CREATE_DISLIKE_COMMENT",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating dislike for comment:", error);
      dispatch({
        type: "CREATE_DISLIKE_COMMENT_ERROR",
        payload: error,
      });
    }
  };
};

export const deleteLikeComment = (commentId) => {
  return async (dispatch) => {
    try {
      const response = await CommentService.deleteLikeComment(commentId);
      dispatch({
        type: "DELETE_LIKE_COMMENT",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error deleting like for comment:", error);
      dispatch({
        type: "DELETE_LIKE_COMMENT_ERROR",
        payload: error,
      });
    }
  };
};

export const deleteDislikeComment = (commentId) => {
  return async (dispatch) => {
    try {
      const response = await CommentService.deleteDislikeComment(commentId);
      dispatch({
        type: "DELETE_DISLIKE_COMMENT",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error deleting dislike for comment:", error);
      dispatch({
        type: "DELETE_DISLIKE_COMMENT_ERROR",
        payload: error,
      });
    }
  };
};

export const fetchLikesForPost = (postId) => {
  return async (dispatch) => {
    try {
      const response = await PostService.getLikes(postId);
      dispatch({
        type: "FETCH_LIKES_FOR_POST",
        payload: {
          postId,
          likes: response.data,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching likes for post:", error);
      dispatch({
        type: "FETCH_LIKES_FOR_POST_ERROR",
        payload: error,
      });
      throw error;
    }
  };
};

export const fetchDislikesForPost = (postId) => {
  return async (dispatch) => {
    try {
      const response = await PostService.getDisLikes(postId);
      dispatch({
        type: "FETCH_DISLIKES_FOR_POST",
        payload: {
          postId,
          dislikes: response.data,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching dislikes for post:", error);
      dispatch({
        type: "FETCH_DISLIKES_FOR_POST_ERROR",
        payload: error,
      });
      throw error;
    }
  };
};

export const fetchLikesForComment = (commentId) => {
  return async (dispatch) => {
    try {
      const response = await CommentService.getLikes(commentId);
      dispatch({
        type: "FETCH_LIKES_FOR_COMMENT",
        payload: {
          commentId,
          likes: response.data,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching likes for comment:", error);
      dispatch({
        type: "FETCH_LIKES_FOR_COMMENT_ERROR",
        payload: error,
      });
      throw error;
    }
  };
};

export const fetchDislikesForComment = (commentId) => {
  return async (dispatch) => {
    try {
      const response = await CommentService.getDisLikes(commentId);
      dispatch({
        type: "FETCH_DISLIKES_FOR_COMMENT",
        payload: {
          commentId,
          dislikes: response.data,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching dislikes for comment:", error);
      dispatch({
        type: "FETCH_DISLIKES_FOR_COMMENT_ERROR",
        payload: error,
      });
      throw error;
    }
  };
};
