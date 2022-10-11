import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './TopNav.css';
import SearchBarModal from './SearchBarModal';

const TopNav = () => {

    const navigate = useNavigate();
    
    const [searching, setSearching] = useState(false);

    const [input, setInput] = useState('');

    const activateSearchModal = (e) => {
        if (e.target.value !== '') {
            setSearching(true);
            setInput(e.target.value)
        } else {
            setSearching(false)
            setInput('');
        }
    }

    const goToHome = () => {
        navigate('/')
    }

    return (
        <nav className="topNavMainBox">
            <h1 onClick={goToHome}>Ascents</h1>
            <ul className="topNavLinks">
                <Link to=''>
                    <li>Home</li>
                </Link>
                <Link to='Profile'>
                    <li>Profile</li>
                </Link>
                <Link to='RecentAscents'>
                    <li>Recent Ascents</li>
                </Link>
                <Link to='SearchAreas'>
                    <li>Areas</li>
                </Link>
                <Link to='AddAscent'>
                    <li>Add Ascent</li>
                </Link>
            </ul>
            <div className="topNavSearchResultBox">
                <div className="topNavInputBox">
                    <span className="material-symbols-sharp">search</span>
                    <input type='text' onChange={(e) => activateSearchModal(e)} className="topNavInput"/>
                    {searching? <SearchBarModal data={input}/> : null}
                </div>
            </div>
        </nav>
    )
}

export default TopNav;