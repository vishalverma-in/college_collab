import React, { Fragment, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import FeedItem1 from './FeedItem1';
import Spinner from '../layout/Spinner';
import { useFeed, getFeed } from '../../context/feed/FeedState';
import FeedFilter from './FeedFilter';

const Feed = () => {
  const [feedState, feedDispatch] = useFeed();

  const { feedPosts, filteredPosts } = feedState;

  useEffect(() => {
    getFeed(feedDispatch);
  }, [feedDispatch]);

  if (feedPosts !== null && feedPosts.length === 0) {
    return <h4>No Posts available</h4>;
  }

  return (
    <Fragment>
      <h2>Your Feed</h2>
      <FeedFilter />
      {feedPosts !== null ? (
        <TransitionGroup>
          {filteredPosts !== null
            ? filteredPosts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <FeedItem1
                 contact={contact} />
                </CSSTransition>
              ))
            : feedPosts.map((contact) => (
                <CSSTransition
                  key={contact._id}
                  timeout={500}
                  classNames='item'
                >
                  <FeedItem1
                 contact={contact} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Feed;