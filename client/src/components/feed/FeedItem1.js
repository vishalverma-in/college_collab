import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';
import { updateFeed, useFeed, getFeed } from '../../context/feed/FeedState';

const FeedItem = ({ contact }) => {
  const [feedState, feedDispatch] = useFeed();

  const { feedPosts, filteredPosts } = feedState;

  useEffect(() => {
    getFeed(feedDispatch);
  }, [feedDispatch]);

  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  const { _id, name, email, phone, type, description, likes, comments, completed } = contact;

  let postLiked = 0;

  if(contact.likes.includes(user._id) === true) {
    postLiked = 1;
  }

  const likePost= () => {
    if(contact.likes.includes(user._id) !== true) {
      contact.likes.push(user._id);
      postLiked = 1;
    } else {
      const index = contact.likes.indexOf(user._id);
      contact.likes.splice(index, 1);
      postLiked = 0;
    }
    updateFeed(feedDispatch, contact);
  }

  return (
    <div>

      <div className='card' style={{margin: '2rem'}}>
        <h3 className='text-primary text-left'>
          <Link to={"/feed/"+_id}>{name}{' '}</Link>
          
          <span
            style={{ float: 'right' }}
            className={
              'badge ' +
              (type === 'professional' ? 'badge-success' : 'badge-primary')
            }
          >
            {type === 'professional' ? <p>Research Paper</p> : <p>Project</p>}
          </span>
          <span
          style={{ float: 'right' }}
            className={
              'badge ' +
              (completed === 'notcompleted' ? 'badge-primary' : 'badge-success')
            }
          >
            {completed === 'notcompleted' ? <p>Ongoing</p> : <p>completed</p>}
          </span>
        </h3>
        <ul className='list'>
          {email && (
            <li>
              <i class="fas fa-solid fa-graduation-cap"></i> {email}
            </li>
          )}
          {phone && (
            <li>
            <i class="fas fa-solid fa-link"></i> 
            <a href={phone}> {phone}</a>
            </li>
          )}
          {description && (
            <li>
            <i class="fas fa-solid fa-arrow-right"></i> {description}
            </li>
          )}
        </ul>
        <p>
          <button className='btn' onClick={likePost}>
            {
              postLiked === 1 ? 
              <i class="fas fa-solid fa-thumbs-down">&nbsp;{contact.likes.length}</i> :
              <i class="fas fa-solid fa-thumbs-up">&nbsp;{contact.likes.length}</i>
            }
          </button>
          <button className='btn'>
            <i class="fas fa-solid fa-comment">&nbsp;{contact.comments.length}</i>
          </button>
        </p>
      </div>
    </div>

  );
};

export default FeedItem;