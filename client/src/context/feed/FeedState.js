import React, { useReducer, useContext } from 'react';
import axios from 'axios';
import FeedContext from './feedContext';
import feedReducer from './feedReducer';
import {
  GET_FEED,
  FILTER_FEED,
  CLEAR_FEED,
  UPDATE_FEED
} from '../types';

// Create a custom hook to use the contact context

export const useFeed = () => {
  const { state, dispatch } = useContext(FeedContext);
  return [state, dispatch];
};

// Action creators
// NOTE: These could be moved to a separate file like in redux but they remain here for ease of students transitioning

// Get feed
export const getFeed = async (dispatch) => {
  try {
    const res = await axios.get('/api/contacts/feed');

    dispatch({
      type: GET_FEED,
      payload: res.data
    });
  } catch (err) {
    // dispatch({
    //   type: CONTACT_ERROR,
    //   payload: err.response.msg
    // });
    console.log(err.message);
  }
};

// Update Contact
export const updateFeed = async (dispatch, contact) => {
  try {
    const res = await axios.put(`/api/contacts/${contact._id}`, contact);

    dispatch({
      type: UPDATE_FEED,
      payload: res.data
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Filter Contacts
export const filterFeed = (dispatch, text) => {
  dispatch({ type: FILTER_FEED, payload: text });
};

// Clear Filter
export const clearFilter = (dispatch) => {
  dispatch({ type: CLEAR_FEED });
};

const FeedState = (props) => {
  const initialState = {
    feedPosts: null,
    filteredPosts: null,
  };

  const [state, dispatch] = useReducer(feedReducer, initialState);

  return (
    <FeedContext.Provider value={{ state: state, dispatch}}>
      {props.children}
    </FeedContext.Provider>
  );
};

export default FeedState;
