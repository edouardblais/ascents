import React from 'react';
import { Link } from "react-router-dom";

const Profile = () => {
    return (
        <div>
            <h1>Profile</h1>
            <ul>
                <Link to='Routes'>
                    <li>Routes Logged</li>
                </Link>
                <Link to='Boulders'>
                    <li>Boulders Logged</li>
                </Link>
                <Link to='Following'>
                    <li>Following</li>
                </Link>
                <Link to='ToDo'>
                    <li>To Do List</li>
                </Link>
            </ul>
        </div>
    )
}

export default Profile;