import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  useContacts,
  deleteContact,
  setCurrent,
  clearCurrent,
  updateContact
} from '../../context/contact/ContactState';
import { useAuth } from '../../context/auth/AuthState';

const ContactItem = ({ contact }) => {
  // we just need the contact dispatch without state.
  const contactDispatch = useContacts()[1];

  const [authState, authDispatch] = useAuth();
  const { isAuthenticated, user } = authState;

  let { _id, name, email, phone, type, description, likes, completed } = contact;

  const onDelete = () => {
    deleteContact(contactDispatch, _id);
    clearCurrent(contactDispatch);
  };

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
    updateContact(contactDispatch, contact);
  }

  return (
    <div className='card'>
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
          {completed === 'notcompleted' ? <p>Ongoing</p> : <p>Completed</p>}
        </span>
      </h3>
      <h5>Posted By- {user.name}</h5>

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
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(contactDispatch, contact)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired
};

export default ContactItem;
