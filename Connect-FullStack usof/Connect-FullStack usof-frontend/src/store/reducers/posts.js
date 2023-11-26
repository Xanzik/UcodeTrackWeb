const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST_SUCCESS":
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
        error: null,
      };
    case "CREATE_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_POSTS_SUCCESS":
      return {
        ...state,
        posts: action.payload,
        loading: false,
        error: null,
      };
    case "GET_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
