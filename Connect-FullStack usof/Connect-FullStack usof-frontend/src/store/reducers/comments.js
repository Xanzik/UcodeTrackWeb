const initialState = {
  comments: [],
  replies: [],
  loading: false,
  error: null,
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: action.payload,
        error: null,
      };
    case "GET_COMMENTS_FAILURE":
      return {
        ...state,
        comments: [],
        error: action.payload,
      };
    case "GET_REPLIES_SUCCESS":
      return {
        ...state,
        replies: action.payload,
        error: null,
      };
    case "GET_REPLIES_FAILURE":
      return {
        ...state,
        replies: [],
        error: action.payload,
      };
    case "DELETE_COMMENT_SUCCESS":
      const updatedComments = state.comments.filter(
        (comment) => comment.id !== action.payload
      );
      return {
        ...state,
        comments: updatedComments,
        error: null,
      };
    case "DELETE_COMMENT_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "RESET_REPLIES":
      return {
        ...state,
        replies: [],
        error: null,
      };
    default:
      return state;
  }
};

export default commentsReducer;
