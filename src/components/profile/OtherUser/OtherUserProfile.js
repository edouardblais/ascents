import React, { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { auth, addToFollowing, addToFollower, getUserInfo, removeFromFollowers, removeFromFollowing } from '../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const OtherUserProfile = () => {
    const location = useLocation();
    const otherUser = location.state.otherUserInfo;

    const [user, loading, error] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState('');

    const [followed, setFollowed] = useState(false);

    useEffect(() => {
        if (user) {
            getUserInfo(user.uid)
                .then((resolvedinfo) => {
                const infotoset = resolvedinfo[0];
                setUserInfo(infotoset);
            })
        }
    }, [user]);

    useEffect(() => {
        userInfo.following.forEach((followed) => {
            if (followed.email === otherUser.email) {
                setFollowed(true)
            }
        })
    }, [userInfo, otherUser])

    const followUser = () => {
        if (user) {
            addToFollowing(userInfo, otherUser);
            addToFollower(userInfo, otherUser);
            setFollowed(true)
            alert(`You are now following ${otherUser.name}!`)
        } else {
            alert('Please sign in or register to follow climbers!')
        }
    }

    const unfollowUser = () => {
        const newFollowingArray = userInfo.following.filter((otherusername) => (otherusername !== otherUser.name));
        const newFollowersArray = otherUser.followers.filter((otherusername) => (otherusername !== userInfo.name));
        removeFromFollowing(userInfo, otherUser, newFollowingArray);
        removeFromFollowers(userInfo, otherUser, newFollowersArray);
        setFollowed(false);
        alert(`You have unfollowed ${otherUser.name}!`)
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
                <p>Following: {otherUser.totalfollowing}</p>
                <p>Followers: {otherUser.totalfollowers}</p>
                {followed? <button type='button' onClick={unfollowUser}>Unfollow</button> : <button type='button' onClick={followUser}>Follow</button>}
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