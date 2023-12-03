const initialState = {
  commentLikes: {},
  commentDislikes: {},
};

const commentLikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_LIKE_COMMENT":
    case "DELETE_LIKE_COMMENT":
      return {
        ...state,
        [action.payload.commentId]: action.payload.likes,
      };
    case "CREATE_DISLIKE_COMMENT":
    case "DELETE_DISLIKE_COMMENT":
      return {
        ...state,
        [action.payload.commentId]: action.payload.dislikes,
      };
    case "FETCH_LIKES_FOR_COMMENT":
      return {
        ...state,
        commentLikes: {
          ...state.commentLikes,
          [action.payload.commentId]: action.payload.likes,
        },
      };

    case "FETCH_DISLIKES_FOR_COMMENT":
      return {
        ...state,
        commentDislikes: {
          ...state.commentDislikes,
          [action.payload.commentId]: action.payload.dislikes,
        },
      };
    default:
      return state;
  }
};

export default commentLikesReducer;
