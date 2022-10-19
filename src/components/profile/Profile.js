import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { auth, getUserInfo, updateProfile } from '../firebase/Firebase';
import RoutesLogged from './ProfileInfo/RoutesLogged';
import BouldersLogged from './ProfileInfo/BouldersLogged';
import Following from './ProfileInfo/Following';
import ToDo from './ProfileInfo/ToDo';
import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import './Profile.css';

const Profile = () => {
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
    const [displayFollowers, setDisplayFollowers] = useState(false);
    const [displayToDo, setDisplayToDo]= useState(false);

    const [createdOn, setCreatedOn] = useState('');
    const [lastSignIn, setLastSignIn] = useState('');

    useEffect(() => {
        if (user) {
            setCreatedOn(format(new Date(user.metadata.creationTime), 'PPP'));
            setLastSignIn(formatDistanceToNowStrict(new Date(user.metadata.lastSignInTime)));
        }
    }, [user])

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

    const seeProfileinfo = () => {
        setDisplayBouldersLogged(false);
        setDisplayFollowers(false);
        setDisplayToDo(false);
        setDisplayRoutesLogged(false);
        setDisplayInfo(true);
    }

    const seeRoutesLogged = () => {
        setDisplayInfo(false);
        setDisplayBouldersLogged(false);
        setDisplayFollowers(false);
        setDisplayToDo(false);
        setDisplayRoutesLogged(true);
    }

    const seeBouldersLogged = () => {
        setDisplayInfo(false);
        setDisplayFollowers(false);
        setDisplayToDo(false);
        setDisplayRoutesLogged(false);
        setDisplayBouldersLogged(true);
    }

    const seeFollowing = () => {
        setDisplayInfo(false);
        setDisplayBouldersLogged(false);
        setDisplayRoutesLogged(false);
        setDisplayToDo(false);
        setDisplayFollowers(true);
    }

    const seeToDo = () => {
        setDisplayInfo(false);
        setDisplayBouldersLogged(false);
        setDisplayRoutesLogged(false);
        setDisplayFollowers(false);
        setDisplayToDo(true);
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
    
    if (user && displayInfo && !isEditing) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <h3 className='profileName'>{name}</h3>
                    <p className='profileText'>{age} years old</p>
                    <p className='profileText'>{country}</p>
                    <p className='profileText'>Ascents user since {createdOn}</p>
                    <p className='profileText'>Last seen {lastSignIn} ago</p>
                </div>
                <div className='profileNav'>
                    <div className='activeToggle'>Profile Info</div>
                    <button onClick={seeRoutesLogged}>Routes Logged</button>
                    <button onClick={seeBouldersLogged}>Boulders Logged</button>
                    <button onClick={seeToDo}>To-Do's</button>
                    <button onClick={seeFollowing}>Following/Followers</button>
                </div>
                <div className='profileContent'>
                    <p>Started climbing in: {startedClimbing}</p>
                    <p>Favorite areas: {favoriteAreas}</p>
                    <p>Other interests: {otherInterests}</p>
                    <p>Following: {userInfo.totalfollowing}</p>
                    <p>Followers: {userInfo.totalfollowers}</p>
                    <button type='button' onClick={() => editInfo()}>Edit</button>
                </div>
            </div>
        )
    }

    if (user && displayInfo && isEditing) {
        return (
                <div className='profileBox'>
                    <div className='profileInfoBox'>
                        <h3>{name}</h3>
                        <p>Age: {age}</p>
                        <p>Country: {country}</p>
                    </div>
                    <div className='profileNav'>
                        <div className='activeToggle'>Profile Info</div>
                        <button onClick={seeRoutesLogged}>Routes Logged</button>
                        <button onClick={seeBouldersLogged}>Boulders Logged</button>
                        <button onClick={seeToDo}>To-Do's</button>
                        <button onClick={seeFollowing}>Following/Followers</button>
                    </div>
                    <div className='profileContent'>
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
                </div>
        )
    }

    if (user && displayRoutesLogged) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <h3>{name}</h3>
                    <p>Age: {age}</p>
                    <p>Country: {country}</p>
                </div>
                <div className='profileNav'>
                    <button onClick={seeProfileinfo}>Profile Info</button>
                    <div className='activeToggle'>Routes Logged</div>
                    <button onClick={seeBouldersLogged}>Boulders Logged</button>
                    <button onClick={seeToDo}>To-Do's</button>
                    <button onClick={seeFollowing}>Following/Followers</button>
                </div>
                <RoutesLogged userInfo={userInfo}/>
            </div>
        )
    }

    if (user && displayBouldersLogged) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <h3>{name}</h3>
                    <p>Age: {age}</p>
                    <p>Country: {country}</p>
                </div>
                <div className='profileNav'>
                    <button onClick={seeProfileinfo}>Profile Info</button>
                    <button onClick={seeRoutesLogged}>Routes Logged</button>
                    <div className='activeToggle'>Boulders Logged</div>
                    <button onClick={seeToDo}>To-Do's</button>
                    <button onClick={seeFollowing}>Following/Followers</button>
                </div>
                <BouldersLogged userInfo={userInfo}/>
            </div>
        )
    }

    if (user && displayFollowers) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <h3>{name}</h3>
                    <p>Age: {age}</p>
                    <p>Country: {country}</p>
                </div>
                <div className='profileNav'>
                    <button onClick={seeProfileinfo}>Profile Info</button>
                    <button onClick={seeRoutesLogged}>Routes Logged</button>
                    <button onClick={seeBouldersLogged}>Boulders Logged</button>
                    <button onClick={seeToDo}>To-Do's</button>
                    <div className='activeToggle'>Following/Followers</div>
                </div>
                <Following userInfo={userInfo}/>
            </div>
        )
    }

    if (user && displayToDo) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <h3>{name}</h3>
                    <p>Age: {age}</p>
                    <p>Country: {country}</p>
                </div>
                <div className='profileNav'>
                    <button onClick={seeProfileinfo}>Profile Info</button>
                    <button onClick={seeRoutesLogged}>Routes Logged</button>
                    <button onClick={seeBouldersLogged}>Boulders Logged</button>
                    <div className='activeToggle'>To-Do's</div>
                    <button onClick={seeFollowing}>Following/Followers</button>
                </div>
                <ToDo userInfo={userInfo}/>
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