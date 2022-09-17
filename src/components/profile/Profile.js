import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getUserInfo } from '../firebase/Firebase';

const Profile = () => {

    const [user, loading, error] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        if (user) {
            const info = getUserInfo(user.uid);
            info.then((resolvedinfo) => {
                const infotoset = resolvedinfo[0];
                setUserInfo(infotoset);
            })
        }
    });

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
    
    if (user) {
        return (
            <div>
                <h1>{userInfo.name}</h1>
                <ul>
                    <Link to='Routes' state={userInfo}>
                        <li>Routes Logged</li>
                    </Link>
                    <Link to='Boulders' state={userInfo}>
                        <li>Boulders Logged</li>
                    </Link>
                    <Link to='Following' state={userInfo}>
                        <li>Following</li>
                    </Link>
                    <Link to='ToDo' state={userInfo}>
                        <li>To Do List</li>
                    </Link>
                </ul>
            </div>
        )
    }

    return (
    <div>
        Please <Link to='/SignIn'>sign in</Link> or <Link to='/CreateUser'>create a new user profile</Link>!
    </div>
    )
}

export default Profile;