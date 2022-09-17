import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { auth, logout, getUserInfo } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const UserBox = () => {

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
  }, [user]);


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
            <h2>User Profile</h2>
            <div>
                <div>{userInfo.name}</div>
                <Link to ='/Profile'>Go to Profile</Link>
                <button onClick={logout}>Log Out</button>
            </div>
        </div>
    )
  }
  return (
        <div>
            <h2>User Profile</h2>
            <ul>
                <Link to='/SignIn'>
                    <li>Sign In</li>
                </Link>
                <Link to='/CreateUser'>
                    <li>Create New User</li>
                </Link>
            </ul>
        </div>
  )
}

export default UserBox;