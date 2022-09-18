import React from 'react';
import { Link } from "react-router-dom";

const OtherUserProfile = ({otheruser}) => {

    const followUser = () => {

    }

    return (
        <div>
            <div className='profile box'>
                <h3>{otheruser.name}</h3>
                <p>Age: {otheruser.age}</p>
                <p>Country: {otheruser.country}</p>
                <p>Started climbing in: {otheruser.startedClimbing}</p>
                <p>Favorite areas: {otheruser.favoriteAreas}</p>
                <p>Other interests: {otheruser.otherInterests}</p>
                <button type='button' onClick={followUser}>Follow</button>
            </div>
            <ul>
                <Link to='Routes' state={otheruser}>
                    <li>Routes Logged</li>
                </Link>
                <Link to='Boulders' state={otheruser}>
                    <li>Boulders Logged</li>
                </Link>
                <Link to='Following' state={otheruser}>
                    <li>Following</li>
                </Link>
                <Link to='ToDo' state={otheruser}>
                    <li>To Do List</li>
                </Link>
            </ul>
        </div>
    )
}

export default OtherUserProfile;