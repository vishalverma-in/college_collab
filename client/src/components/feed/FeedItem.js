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

  // Comment
  const [comment, setComment] = useState({
    text: '',
    userName: user.name,
    postedBy: String(user._id)
  });
  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if(comment.length !== 0) {
      contact.comments.push(comment);
      setComment({
        text: '',
        userName: user.name,
        postedBy: String(user._id)
      });
      updateFeed(feedDispatch, contact);
    }
  }

  const onDelete = (id) => {
    const index = contact.comments.indexOf(id);
    contact.comments.splice(index, 1);
    console.log('Function called');
    // updateFeed(feedDispatch, contact);
  }

  return (
    <div>

      <div className='card bg-light' style={{margin: '2rem'}}>
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
        {/* <h5>Posted By- {user.name}</h5> */}
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
          {contact.likes.length}
          <button className='btn' onClick={likePost}>
            {
              postLiked === 1 ? 
              <i class="fas fa-solid fa-thumbs-down"></i> :
              <i class="fas fa-solid fa-thumbs-up"></i>
            }
          </button>
          {contact.comments.length}
          <button className='btn'>
            <i class="fas fa-solid fa-comment"></i>
          </button>
        </p>
      </div>
      
      <div className='card' style={{margin: '2rem', backgroundColor: "#B2FFFF"}}>
        <h3>Comments</h3>
        <form style={{boxShadow:'none', border: 'none'}} onSubmit={onSubmit}>
          <input
            type='text'
            name='text'
            placeholder='Add a comment'
            onChange={onChange}
          />
          <input
            type='submit'
            value='Comment'
            className='btn btn-primary btn-block'
            style={{width: '7rem'}}
          />
        </form>
        {
          comments.length === 0 ?
          <h4>Be the first to add a comment!</h4> :
          comments.slice(0).reverse().map((comment) => (
            <div>
              <span>{comment.userName}: {comment.text} </span>
              {
                user._id === comment.postedBy ? 
                <button className='btn' onClick={()=> {
                  const index = contact.comments.indexOf(comment._id);
                  contact.comments.splice(index, 1);
                  updateFeed(feedDispatch, contact);
                }}>
                  <i class="fas fa-solid fa-trash"></i>
                </button> :
                <p></p>
              }
              
            </div>
          ))
        }
      </div>
    </div>

  );
};

export default FeedItem;