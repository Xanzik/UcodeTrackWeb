const initialState = {
  postLikes: {},
  postDislikes: {},
};

const postLikesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_LIKE":
    case "DELETE_LIKE":
      return {
        ...state,
        [action.payload.postId]: action.payload.likes,
      };
    case "CREATE_DISLIKE":
    case "DELETE_DISLIKE":
      return {
        ...state,
        [action.payload.postId]: action.payload.dislikes,
      };
    case "FETCH_LIKES_FOR_POST":
      return {
        ...state,
        postLikes: {
          ...state.postLikes,
          [action.payload.postId]: action.payload.likes,
        },
      };

    case "FETCH_DISLIKES_FOR_POST":
      return {
        ...state,
        postDislikes: {
          ...state.postDislikes,
          [action.payload.postId]: action.payload.dislikes,
        },
      };
    default:
      return state;
  }
};

export default postLikesReducer;
