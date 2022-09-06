import React from "react";
import { Link } from 'react-router-dom';

const UserBox = () => {
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