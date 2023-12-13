import React, { useState, useEffect } from 'react';
import Input from '@mui/base/Input';
import { styled } from '@mui/system';

import {
  addContact,
  useContacts,
  updateContact,
  clearCurrent
} from '../../context/contact/ContactState';

const initialContact = {
  name: '',
  email: '',
  phone: '',
  type: 'personal',
  description: '',
  likes: [],
  completed: 'notcompleted'
};

const ContactForm = () => {
  const [contactState, contactDispatch] = useContacts();

  const { current } = contactState;

  const [contact, setContact] = useState(initialContact);

  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact(initialContact);
    }
  }, [current]);

  const { name, email, phone, type, description, completed } = contact;

  const onChange = (e) =>
    setContact({ ...contact, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      addContact(contactDispatch, contact).then(() =>
        setContact(initialContact)
      );
    } else {
      updateContact(contactDispatch, contact);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent(contactDispatch);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? 'Edit Post' : 'Add Post'}
      </h2>
      <Input
        type='text'
        placeholder='Title'
        name='name'
        value={name}
        onChange={onChange}
        slots={{ input: StyledInputElement }}
      />
      <Input
        type='text'
        placeholder='Eligibility'
        name='email'
        value={email}
        onChange={onChange}
        slots={{ input: StyledInputElement }}
      />
      <Input
        type='text'
        placeholder='Apply Link'
        name='phone'
        value={phone}
        onChange={onChange}
        slots={{ input: StyledInputElement }}
      />
      <Input
        type='text'
        placeholder='Description'
        name='description'
        value={description}
        onChange={onChange}
        slots={{ input: StyledInputElement }}
      />
      <h5>Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Project{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Research Paper


      {
        type === 'personal' ? <h5>Project Status</h5> : <h5>Research Paper Status</h5>
      }
      <input
        type='radio'
        name='completed'
        value='notcompleted'
        checked={completed === 'notcompleted'}
        onChange={onChange}
      />{' '}
      Ongoing{' '}
      <input
        type='radio'
        name='completed'
        value='yescompleted'
        checked={completed === 'yescompleted'}
        onChange={onChange}
      />{' '}
      Completed


      <div>
        <input
          type='submit'
          value={current ? 'Update Post' : 'Add Post'}
          className='btn btn-primary btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};


const blue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const grey = {
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

const StyledInputElement = styled('input')(
  ({ theme }) => `
  width: 320px;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 12px;
  border-radius: 12px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 24px ${theme.palette.mode === 'dark' ? blue[900] : blue[100]};

  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);


export default ContactForm;