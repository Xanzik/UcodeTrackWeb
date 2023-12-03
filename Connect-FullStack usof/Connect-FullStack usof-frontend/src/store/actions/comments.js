import PostService from "../../services/PostService.js";
import CommentService from "../../services/CommentService.js";

export const getComments = (id) => {
  return async (dispatch) => {
    try {
      const response = await PostService.getComments(id);
      dispatch({
        type: "GET_COMMENTS_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      dispatch({
        type: "GET_COMMENTS_FAILURE",
        payload: error,
      });
    }
  };
};

export const getRepliesForComments = (id) => {
  return async (dispatch) => {
    try {
      const response = await CommentService.getRepliesForComment(id);
      dispatch({
        type: "GET_REPLIES_SUCCESS",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      dispatch({
        type: "GET_REPLIES_FAILURE",
        payload: error,
      });
    }
  };
};

export const createComment = (id, content, replyCommentID) => {
  return async (dispatch) => {
    try {
      const response = await PostService.createComment(
        id,
        content,
        replyCommentID
      );
      dispatch({
        type: "CREATE_COMMENT",
        payload: response.data,
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      dispatch({
        type: "CREATE_COMMENT_ERROR",
        payload: error,
      });
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    try {
      await CommentService.deleteComment(commentId);
      dispatch({
        type: "DELETE_COMMENT_SUCCESS",
        payload: commentId,
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      dispatch({
        type: "DELETE_COMMENT_FAILURE",
        payload: error,
      });
    }
  };
};
