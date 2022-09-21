import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { auth, addToFollowing, addToFollower } from '../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const OtherUserProfile = () => {
    const location = useLocation();
    const otherUser = location.state.otherUserInfo;

    const [user, loading, error] = useAuthState(auth);

    const followUser = () => {
        if (user) {
            addToFollowing(user, otherUser);
            addToFollower(user, otherUser);
        } else {
            alert('Please sign in or register to follow climbers!')
        }
    }

    if (loading) {
        return (
          <div>
            <p>Initialising User...</p>
          </div>
        );
      }
    
    if (error) {
        return (
            <div>
                <p>Error: {error}</p>
            </div>
        );
    }

    return (
        <div>
            <div className='profile box'>
                <h3>{otherUser.name}</h3>
                <p>Age: {otherUser.otherinfo.age}</p>
                <p>Country: {otherUser.otherinfo.country}</p>
                <p>Started climbing in: {otherUser.otherinfo.startedclimbing}</p>
                <p>Favorite areas: {otherUser.otherinfo.favoriteareas}</p>
                <p>Other interests: {otherUser.otherinfo.otherinterests}</p>
                <button type='button' onClick={followUser}>Follow</button>
            </div>
            <ul>
                <Link to='Routes' state={otherUser}>
                    <li>Routes Logged</li>
                </Link>
                <Link to='Boulders' state={otherUser}>
                    <li>Boulders Logged</li>
                </Link>
                <Link to='Following' state={otherUser}>
                    <li>Following</li>
                </Link>
                <Link to='ToDo' state={otherUser}>
                    <li>To Do List</li>
                </Link>
            </ul>
        </div>
    )
}

export default OtherUserProfile;