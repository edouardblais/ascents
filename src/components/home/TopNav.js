import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import './TopNav.css';
import SearchBarModal from './SearchBarModal';

const TopNav = () => {

    const navigate = useNavigate();
    
    const [searching, setSearching] = useState(false);

    const [input, setInput] = useState('');

    const [homeFocus, setHomeFocus] = useState(true);
    const [profileFocus, setProfileFocus] = useState(false);
    const [recentAscentsFocus, setRecentAscentsFocus] = useState(false);
    const [areasFocus, setAreasFocus] = useState(false);
    const [addAscentFocus , setAddAscentFocus] = useState(false);

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

    const activateHome = () => {
        setProfileFocus(false);
        setRecentAscentsFocus(false);
        setAreasFocus(false);
        setAddAscentFocus(false)
        setHomeFocus(true)
    }

    const activateProfile = () => {
        setRecentAscentsFocus(false);
        setAreasFocus(false);
        setAddAscentFocus(false);
        setHomeFocus(false);
        setProfileFocus(true);
    }

    const activateRecentAscents = () => {
        setAreasFocus(false);
        setAddAscentFocus(false);
        setHomeFocus(false);
        setProfileFocus(false);
        setRecentAscentsFocus(true);
    }

    const activateAreas = () => {
        setAddAscentFocus(false);
        setHomeFocus(false);
        setProfileFocus(false);
        setRecentAscentsFocus(false);
        setAreasFocus(true);
    }

    const activateAddAscent = () => {
        setHomeFocus(false);
        setProfileFocus(false);
        setRecentAscentsFocus(false);
        setAreasFocus(false);
        setAddAscentFocus(true);
    }

    return (
        <nav className="topNavMainBox">
            <h1 onClick={goToHome}>Ascents</h1>
            <ul className="topNavLinks">
                <Link to=''>
                    <li className={homeFocus? 'activeNav' : ''} onClick={activateHome}>Home</li>
                </Link>
                <Link to='Profile'>
                    <li className={profileFocus? 'activeNav' : ''} onClick={activateProfile}>Profile</li>
                </Link>
                <Link to='RecentAscents'>
                    <li className={recentAscentsFocus? 'activeNav' : ''} onClick={activateRecentAscents}>Recent Ascents</li>
                </Link>
                <Link to='SearchAreas'>
                    <li className={areasFocus? 'activeNav' : ''} onClick={activateAreas}>Areas</li>
                </Link>
                <Link to='AddAscent'>
                    <li className={addAscentFocus? 'activeNav' : ''} onClick={activateAddAscent}>Add Ascent</li>
                </Link>
            </ul>
            <div className="topNavSearchResultBox">
                <div className="topNavInputBox">
                    <span className="material-symbols-sharp">search</span>
                    <input type='text' onChange={(e) => activateSearchModal(e)} className="topNavInput"/>
                </div>
                <div>
                    {searching? <SearchBarModal data={input}/> : null}
                </div>
            </div>
        </nav>
    )
}

export default TopNav;