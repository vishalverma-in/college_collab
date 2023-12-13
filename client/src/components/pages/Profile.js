import React, {useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthState';
import { getFeed, useFeed } from '../../context/feed/FeedState';

const Profile = () => {

    const { id } = useParams(); // get ID from the URL
    // const [authState, authDispatch] = useAuth();
    // const { isAuthenticated, user } = authState;
    const [feedState, feedDispatch] = useFeed();
    const {feedPosts} = feedState;

    useEffect(() => {
        getFeed(feedDispatch);
    }, [feedDispatch]);
    
    const userPosts = [];

    console.log(feedPosts);
    let numProjects = 0, numPapers = 0, numCompleted = 0, numPending = 0;
    feedPosts.map(post => {
        if(post.user == id) {
            if(post.type === "professional") numPapers++;
            else numProjects++;
            if(post.completed === "yescompleted") numCompleted++;
            else numPending++;
            userPosts.push(post);
        }
    })

    const [user, setUser] = useState(null);
    const getUser = async () => {
        const response = await fetch(`https://college-colab.onrender.com/api/users/${id}`, {
            method: "GET",
        });
        const data = await response.json();
        setUser(data);
        // console.log(response);
    };

    useEffect(() => {
        getUser();
    }, [])

    return (
        <div style={{textAlign: "center"}}>
            <h1>Profile</h1>
            {
                user && <h4>{user.name}</h4>
            }
            {
                user && <h4>{user.email}</h4>
            }
            <div className='profile-flex'>
                <div style={{boxShadow: "3.84px 3.84px 12.8px rgba(21,46,171,.13)", borderRadius: "10px", margin: "30px 10px", padding: "15px"}}>
                    <h1>
                        List of completed Projects/Papers 
                        <span style={{fontWeight: "400", borderRadius: "50%", margin: "10px", padding: "2px 15px", backgroundColor: "lightgreen"}} >
                            {numCompleted}
                        </span>
                    </h1>
                    {
                        userPosts.map(post => (
                            post.completed === "yescompleted" && 
                            <div>
                                <Link to={"/feed/"+post._id}>{post.name}{' '}</Link>
                            </div>
                        ))
                    }
                </div>

                <div style={{border: "1px solid #d8d7d7", borderRadius: "10px", margin: "30px 10px", padding: "15px"}}>
                    <h1>List of ongoing Projects/Papers
                        <span style={{fontWeight: "400", borderRadius: "50%", margin: "10px", padding: "2px 15px", backgroundColor: "#00FFFF"}} >
                            {numPending}
                        </span>
                    </h1>
                    {
                        userPosts.map(post => (
                            post.completed !== "yescompleted" && 
                            <div>
                                <Link to={"/feed/"+post._id}>{post.name}{' '}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='profile-flex'>
                <div style={{boxShadow: "3.84px 3.84px 12.8px rgba(21,46,171,.13)", borderRadius: "10px", margin: "30px 10px", padding: "15px"}}>
                    <h1>List of Projects
                    <span style={{fontWeight: "400", borderRadius: "50%", margin: "10px", padding: "2px 15px", backgroundColor: "#6CB4EE"}} >
                        {numProjects}
                    </span>
                    </h1>
                    {
                        userPosts.map(post => (
                            post.type !== "professional" && 
                            <div>
                                <Link to={"/feed/"+post._id}>{post.name}{' '}</Link>
                            </div>
                        ))
                    }
                </div>

                <div style={{border: "1px solid #d8d7d7", borderRadius: "10px", margin: "30px 10px", padding: "15px"}}>
                    <h1>List of Papers
                    <span style={{fontWeight: "400", borderRadius: "50%", margin: "10px", padding: "2px 15px", backgroundColor: "#6CB4EE"}} >
                        {numPapers}
                    </span>
                    </h1>
                    {
                        userPosts.map(post => (
                            post.type === "professional" && 
                            <div>
                                <Link to={"/feed/"+post._id}>{post.name}{' '}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile