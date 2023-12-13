import {
  GET_FEED,
  FILTER_FEED,
  CLEAR_FEED,
  UPDATE_FEED
} from '../types';

const feedReducer = (state, action) => {
  switch (action.type) {
    case GET_FEED:
      return {
        ...state,
        feedPosts: action.payload
      };
    case FILTER_FEED:
      return {
        ...state,
        filteredPosts: state.feedPosts.filter(({ name, email }) => {
          const testString = `${name}${email}`.toLowerCase();
          return testString.includes(action.payload.toLowerCase());
        })
      };
    case UPDATE_FEED:
      return {
        ...state,
        feedPosts: state.feedPosts.map((post) =>
        post._id === action.payload._id ? action.payload : post
        )
      };
    case CLEAR_FEED:
      return {
        ...state,
        filteredPosts: null
      };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};

export default feedReducer;