import React from "react";
import { Link } from 'react-router-dom';

const TopNav = () => {
    return (
        <nav>
            <ul>
                <Link to=''>
                    <li>Home</li>
                </Link>
                <Link to='RecentAscents'>
                    <li>Recent Ascents</li>
                </Link>
                <Link to='Areas'>
                    <li>Areas</li>
                </Link>
                <Link to='Profile'>
                    <li>Profile</li>
                </Link>
                <Link to='AddAscent'>
                    <li>Add Ascent</li>
                </Link>
            </ul>
        </nav>
    )
}

export default TopNav;