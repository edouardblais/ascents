import React from 'react';
import { Link } from "react-router-dom";

const SignIn = () => {
    return (
        <div>
            <h1>SignIn</h1>
            <Link to='CreateUser'>Create New User Profile</Link>
        </div>
    )
}

export default SignIn;