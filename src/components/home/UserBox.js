import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { auth, logout, getUserInfo } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import './UserBox.css'

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
        <div className="userBox">
            <h3 className="userBoxTitle">{userInfo.name}</h3>
            <Link className="link" to='/Profile'>My Profile</Link>
            <button onClick={logout}>Log Out</button>
        </div>
    )
  }
  return (
        <div className="userBox">
          <h3 className="userBoxTitle">Welcome!</h3>
          <Link className="link" to='/SignIn'>
              Sign In
          </Link>
          <Link className="link" to='/CreateUser'>
              Create New User
          </Link>
        </div>
  )
}

export default UserBox;