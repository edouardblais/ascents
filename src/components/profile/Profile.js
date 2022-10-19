import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, getUserInfo, updateProfile } from '../firebase/Firebase';

const Profile = () => {
    const navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState('');

    const [displayInfo, setDisplayInfo] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [country, setCountry] = useState('');
    const [startedClimbing, setStartedClimbing] = useState('');
    const [favoriteAreas, setFavoriteAreas] = useState('');
    const [otherInterests, setOtherInterests] = useState('');

    const [displayRoutesLogged, setDisplayRoutesLogged] = useState(false);
    const [displayBouldersLogged, setDisplayBouldersLogged] = useState(false);
    const [displayFollowers, setDisplayFollowing] = useState(false);

    useEffect(() => {
        if (user) {
            getUserInfo(user.uid)
                .then((resolvedinfo) => {
                const infotoset = resolvedinfo[0];
                setUserInfo(infotoset);
            })
        }
    }, [user]);

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setAge(userInfo.otherinfo.age);
            setCountry(userInfo.otherinfo.country);
            setStartedClimbing(userInfo.otherinfo.startedclimbing);
            setFavoriteAreas(userInfo.otherinfo.favoriteareas);
            setOtherInterests(userInfo.otherinfo.otherinterests);
        }
    }, [userInfo]);

    const editInfo = () => {
        if (isEditing === false) {
            setIsEditing(true);
        }
    };

    const saveEdits = async (newname, newage, newcountry, newstartedclimb, newfavareas, newotherint, email) => {
        if (isEditing === true) {
            await updateProfile(newname, newage, newcountry, newstartedclimb, newfavareas, newotherint, email);
            setIsEditing(false);
        }
    }

    const seeRoutesLogged = () => {
        navigate('/Profile/Routes', {
            state: {
                userInformation: userInfo,
            }
        })
    }

    const seeBouldersLogged = () => {
        navigate('/Profile/Boulders', {
            state: {
                userInformation: userInfo,
            }
        })
    }

    const seeFollowing = () => {
        navigate('/Profile/Following', {
            state: {
                userInformation: userInfo,
            }
        })
    }

    const seeToDo = () => {
        navigate('/Profile/ToDo', {
            state: {
                userInformation: userInfo,
            }
        })
    }

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
    
    if (user && displayInfo === true && isEditing === false) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <h3>{name}</h3>
                    <p>Age: {age}</p>
                    <p>Country: {country}</p>
                </div>
                <div className='profileMoreInfoBox'>
                    <p>Started climbing in: {startedClimbing}</p>
                    <p>Favorite areas: {favoriteAreas}</p>
                    <p>Other interests: {otherInterests}</p>
                    <p>Following: {userInfo.totalfollowing}</p>
                    <p>Followers: {userInfo.totalfollowers}</p>
                    <button type='button' onClick={() => editInfo()}>Edit</button>
                </div>
                <div>
                    <button onClick={seeRoutesLogged}>Routes Logged</button>
                    <button onClick={seeBouldersLogged}>Boulders Logged</button>
                    <button onClick={seeToDo}>To-Do's</button>
                    <button onClick={seeFollowing}>Following/Followers</button>
                </div>
            </div>
        )
    }

    if (user && displayInfo === true && isEditing === true) {
        return (
            <div>
                <div className='profile box'>
                    <form>
                        <label htmlFor='name'>Name</label>
                        <input name='name' type='text' onChange={(e) => setName(e.target.value)} value={name}/>

                        <label htmlFor='age'>Age</label>
                        <input name='age' type='number' onChange={(e) => setAge(e.target.value)} value={age}/>

                        <label htmlFor='country'>Country</label>
                        <input name='country' type='text' onChange={(e) => setCountry(e.target.value)} value={country}/>

                        <label htmlFor='started'>Started climbing in:</label>
                        <input name='started' type='year' onChange={(e) => setStartedClimbing(e.target.value)} value={startedClimbing}/>
                        
                        <label htmlFor='favorite'>Favorite areas</label>
                        <input name='favorite' type='text' onChange={(e) => setFavoriteAreas(e.target.value)} value={favoriteAreas}/>

                        <label htmlFor='other'>Other interests</label>
                        <input name='other' type='text' onChange={(e) => setOtherInterests(e.target.value)} value={otherInterests}/>
                    </form>
                    <button type='button' onClick={() => saveEdits(name, age, country, startedClimbing, favoriteAreas, otherInterests, userInfo.email)}>Save Edits</button>
                </div>
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