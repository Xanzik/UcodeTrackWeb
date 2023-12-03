const initialState = {
  posts: [],
  loading: false,
  error: null,
  post: null,
  categories: [],
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
    case "GET_POST_SUCCESS":
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    case "GET_POST_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "GET_POST_CATEGORIES_SUCCESS":
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };
    case "GET_POST_CATEGORIES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "UPDATE_POST_SUCCESS":
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload;
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
      };
    case "UPDATE_POST_FAILURE":
      return state;
    case "DELETE_POST_SUCCESS":
      const updatedPostsDelete = state.posts.filter(
        (post) => post.id !== action.payload
      );
      return {
        ...state,
        posts: updatedPostsDelete,
      };
    case "DELETE_POST_FAILURE":
      return state;
    default:
      return state;
  }
};

export default postsReducer;
