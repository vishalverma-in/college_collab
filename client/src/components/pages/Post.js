import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import FeedItem from '../feed/FeedItem';
import Spinner from '../layout/Spinner';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const getPost = async () => {
    const response = await fetch(`https://college-colab.onrender.com/api/contacts/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data)
    setPost(data);
  };

  useEffect(() => {
    getPost();
  }, [])
  return (
    <div className='grid'>
      {
        post !== null ? 
          <div>
            <FeedItem 
                contact={ post }
            />
          </div>
         : 
          <Spinner />
      }
    </div>
  );
};

export default Post;