import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth, getUserInfoByEmail, updateProfile } from '../firebase/Firebase';
import RoutesLogged from './ProfileInfo/RoutesLogged';
import BouldersLogged from './ProfileInfo/BouldersLogged';
import Following from './ProfileInfo/Following';
import ToDo from './ProfileInfo/ToDo';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { shuffleArray } from '../operations/Operations';
import './Profile.css';

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
    const [displayFollowers, setDisplayFollowers] = useState(false);
    const [displayToDo, setDisplayToDo]= useState(false);

    const [createdOn, setCreatedOn] = useState('');
    const [lastSignIn, setLastSignIn] = useState('');
    const [numberOfAscents, setNumberOfAscents] = useState(0);
    const [numberOfToDos, setNumberOfToDos] = useState(0);
    const [recommendedClimbs, setRecommendedClimbs] = useState([]);

    let counter = 0;

    useEffect(() => {
        if (user) {
            getUserInfoByEmail(user.email)
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

            setNumberOfAscents(userInfo.logbook.length);
            setNumberOfToDos(userInfo.todolist.length);

            setCreatedOn(userInfo.createdon);
            setLastSignIn(formatDistanceToNowStrict(new Date(userInfo.lastsignedin)));

            const recommendedArray = userInfo.logbook.filter((climb) => (climb.recommendation === true));
            const shuffledRecommendations = shuffleArray(recommendedArray);
            setRecommendedClimbs(shuffledRecommendations);
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

    const goToRecommendedClimb = (climb) => {
            navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                state: {
                    chosenClimb: climb,
                }
            })
    }

    const increment = () => {
        counter += 1;
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
                    <div className='profileInfoSubBox'>
                        <h3 className='profileName'>{name}</h3>
                        <p className='profileSubText'>{age} years old</p>
                        <p className='profileSubText'>{country}</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>{numberOfAscents} logged ascents</p>
                        <p className='profileSubText'>{numberOfToDos} dream climbs</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileSubText'>Following {userInfo.totalfollowing} <b>Ascents</b> users</p>
                        <p className='profileSubText'>Followed by {userInfo.totalfollowers} <b>Ascents</b> users</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'><b>Ascents</b> user since</p>
                        <p className='profileSubText'>{createdOn}</p>  
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>Last seen</p>
                        <p className='profileSubText'>{lastSignIn} ago</p>
                    </div>
                </div>
                <div className='profileNav'>
                    <div className='activeToggle'>Profile Info</div>
                    <button onClick={seeRoutesLogged} className='profileButton'>Routes Logged</button>
                    <button onClick={seeBouldersLogged} className='profileButton'>Boulders Logged</button>
                    <button onClick={seeToDo} className='profileButton'>To-Do's</button>
                    <button onClick={seeFollowing} className='profileButton'>Following/Followers</button>
                </div>
                <div className='profileContent'>
                    <div className='contentInfoBox'>
                        <div className='contentInfoSubBox'>
                            <div className='contentInfoSubSubBox'>
                                <p>Name: <b>{name}</b></p>
                                <p>From: <b>{country}</b></p>
                                <p>Age: <b>{age}</b></p>
                            </div>
                            <div className='contentInfoSubSubBox'>
                                <p>Started climbing in: <b>{startedClimbing}</b></p>
                                <p>Favorite areas: <b>{favoriteAreas}</b></p>
                                <p>Other interests: <b>{otherInterests}</b></p>
                            </div>
                            <button type='button' className='profileEditButton' onClick={() => editInfo()}><span className="material-symbols-outlined">settings</span></button>
                        </div>
                    </div>
                    <div className='recommendedBox'>
                            <h2 className='profileName'>Recommended Climbs</h2>
                            <div className='recommendedClimbsBox'>
                                {recommendedClimbs.map((climb, index) => {
                                    increment();
                                    if (counter <= 10) { 
                                        return  <div key={index} onClick={() => goToRecommendedClimb(climb)} className="recommendedClimb">
                                                    <div className="goodClimbTop">
                                                        <div>{climb.climb} - {climb.grade}</div>
                                                    </div>
                                                    <div className="goodClimbBottom">
                                                        <div>{climb.crag} - {climb.area} - {climb.country}</div>
                                                    </div>
                                                </div>
                                    } 
                                })}
                            </div>
                    </div>
                </div>
            </div>
        )
    }

    if (user && displayInfo && isEditing) {
        return (
                <div className='profileBox'>
                    <div className='profileInfoBox'>
                        <div className='profileInfoSubBox'>
                            <h3 className='profileName'>{name}</h3>
                            <p className='profileSubText'>{age} years old</p>
                            <p className='profileSubText'>{country}</p>
                        </div>
                        <div className='profileInfoSubBox'>
                            <p className='profileText'>{numberOfAscents} logged ascents</p>
                            <p className='profileSubText'>{numberOfToDos} dream climbs</p>
                        </div>
                        <div className='profileInfoSubBox'>
                            <p className='profileSubText'>Following {userInfo.totalfollowing} <b>Ascents</b> users</p>
                            <p className='profileSubText'>Followed by {userInfo.totalfollowers} <b>Ascents</b> users</p>
                        </div>
                        <div className='profileInfoSubBox'>
                            <p className='profileText'><b>Ascents</b> user since</p>
                            <p className='profileSubText'>{createdOn}</p>  
                        </div>
                        <div className='profileInfoSubBox'>
                            <p className='profileText'>Last seen</p>
                            <p className='profileSubText'>{lastSignIn} ago</p>
                        </div>
                    </div>
                    <div className='profileNav'>
                        <div className='activeToggle'>Profile Info</div>
                        <button onClick={seeRoutesLogged} className='profileButton'>Routes Logged</button>
                        <button onClick={seeBouldersLogged} className='profileButton'>Boulders Logged</button>
                        <button onClick={seeToDo} className='profileButton'>To-Do's</button>
                        <button onClick={seeFollowing} className='profileButton'>Following/Followers</button>
                    </div>
                    <div className='profileContent'>
                        <form className='contentInfoBox'>
                            <div className='contentInfoSubBox'>
                                <div className='contentInfoSubSubBox'>
                                    <div className='contentInfoInputBox'>
                                        <label htmlFor='name'>Name:</label>
                                        <input name='name' type='text' onChange={(e) => setName(e.target.value)} value={name}/>
                                    </div>
                                    <div className='contentInfoInputBox'>
                                        <label htmlFor='country'>Country:</label>
                                        <input name='country' type='text' onChange={(e) => setCountry(e.target.value)} value={country}/>
                                    </div>
                                    <div className='contentInfoInputBox'>
                                        <label htmlFor='age'>Age:</label>
                                        <input name='age' type='number' onChange={(e) => setAge(e.target.value)} value={age}/>
                                    </div>
                                </div>
                                <div className='contentInfoSubSubBox'>
                                    <div className='contentInfoInputBox'>
                                        <label htmlFor='started'>Started climbing in:</label>
                                        <input name='started' type='number' onChange={(e) => setStartedClimbing(e.target.value)} value={startedClimbing}/>
                                    </div>
                                    <div className='contentInfoInputBox'> 
                                        <label htmlFor='favorite'>Favorite areas:</label>
                                        <input name='favorite' type='text' onChange={(e) => setFavoriteAreas(e.target.value)} value={favoriteAreas}/>
                                    </div> 
                                    <div className='contentInfoInputBox'>
                                        <label htmlFor='other'>Other interests:</label>
                                        <input name='other' type='text' onChange={(e) => setOtherInterests(e.target.value)} value={otherInterests}/>
                                    </div>
                                </div>
                                <button type='button' className='profileEditButton' onClick={() => saveEdits(name, age, country, startedClimbing, favoriteAreas, otherInterests, userInfo.email)}>Save</button>
                            </div>
                        </form>
                        <div className='recommendedBox'>
                            <h2 className='profileName'>Recommended Climbs</h2>
                            <div className='recommendedClimbsBox'>
                                {recommendedClimbs.map((climb, index) => {
                                    increment();
                                    if (counter <= 10) { 
                                        return  <div key={index} onClick={() => goToRecommendedClimb(climb)} className="recommendedClimb">
                                                    <div className="goodClimbTop">
                                                        <div>{climb.climb} - {climb.grade}</div>
                                                    </div>
                                                    <div className="goodClimbBottom">
                                                        <div>{climb.crag} - {climb.area} - {climb.country}</div>
                                                    </div>
                                                </div>
                                    } 
                                })}
                            </div>
                        </div>
                    </div>
                </div>
        )
    }

    if (user && displayRoutesLogged) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <div className='profileInfoSubBox'>
                        <h3 className='profileName'>{name}</h3>
                        <p className='profileSubText'>{age} years old</p>
                        <p className='profileSubText'>{country}</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>{numberOfAscents} logged ascents</p>
                        <p className='profileSubText'>{numberOfToDos} dream climbs</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileSubText'>Following {userInfo.totalfollowing} <b>Ascents</b> users</p>
                        <p className='profileSubText'>Followed by {userInfo.totalfollowers} <b>Ascents</b> users</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'><b>Ascents</b> user since</p>
                        <p className='profileSubText'>{createdOn}</p>  
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>Last seen</p>
                        <p className='profileSubText'>{lastSignIn} ago</p>
                    </div>
                </div>
                <div className='profileNav'>
                    <button onClick={seeProfileinfo} className='profileButton'>Profile Info</button>
                    <div className='activeToggle'>Routes Logged</div>
                    <button onClick={seeBouldersLogged} className='profileButton'>Boulders Logged</button>
                    <button onClick={seeToDo} className='profileButton'>To-Do's</button>
                    <button onClick={seeFollowing} className='profileButton'>Following/Followers</button>
                </div>
                <RoutesLogged userInfo={userInfo}/>
            </div>
        )
    }

    if (user && displayBouldersLogged) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <div className='profileInfoSubBox'>
                        <h3 className='profileName'>{name}</h3>
                        <p className='profileSubText'>{age} years old</p>
                        <p className='profileSubText'>{country}</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>{numberOfAscents} logged ascents</p>
                        <p className='profileSubText'>{numberOfToDos} dream climbs</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileSubText'>Following {userInfo.totalfollowing} <b>Ascents</b> users</p>
                        <p className='profileSubText'>Followed by {userInfo.totalfollowers} <b>Ascents</b> users</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'><b>Ascents</b> user since</p>
                        <p className='profileSubText'>{createdOn}</p>  
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>Last seen</p>
                        <p className='profileSubText'>{lastSignIn} ago</p>
                    </div>
                </div>
                <div className='profileNav'>
                    <button onClick={seeProfileinfo} className='profileButton'>Profile Info</button>
                    <button onClick={seeRoutesLogged} className='profileButton'>Routes Logged</button>
                    <div className='activeToggle'>Boulders Logged</div>
                    <button onClick={seeToDo} className='profileButton'>To-Do's</button>
                    <button onClick={seeFollowing} className='profileButton'>Following/Followers</button>
                </div>
                <BouldersLogged userInfo={userInfo}/>
            </div>
        )
    }

    if (user && displayFollowers) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <div className='profileInfoSubBox'>
                        <h3 className='profileName'>{name}</h3>
                        <p className='profileSubText'>{age} years old</p>
                        <p className='profileSubText'>{country}</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>{numberOfAscents} logged ascents</p>
                        <p className='profileSubText'>{numberOfToDos} dream climbs</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileSubText'>Following {userInfo.totalfollowing} <b>Ascents</b> users</p>
                        <p className='profileSubText'>Followed by {userInfo.totalfollowers} <b>Ascents</b> users</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'><b>Ascents</b> user since</p>
                        <p className='profileSubText'>{createdOn}</p>  
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>Last seen</p>
                        <p className='profileSubText'>{lastSignIn} ago</p>
                    </div>
                </div>
                <div className='profileNav'>
                    <button onClick={seeProfileinfo} className='profileButton'>Profile Info</button>
                    <button onClick={seeRoutesLogged} className='profileButton'>Routes Logged</button>
                    <button onClick={seeBouldersLogged} className='profileButton'>Boulders Logged</button>
                    <button onClick={seeToDo} className='profileButton'>To-Do's</button>
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
                    <div className='profileInfoSubBox'>
                        <h3 className='profileName'>{name}</h3>
                        <p className='profileSubText'>{age} years old</p>
                        <p className='profileSubText'>{country}</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>{numberOfAscents} logged ascents</p>
                        <p className='profileSubText'>{numberOfToDos} dream climbs</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileSubText'>Following {userInfo.totalfollowing} <b>Ascents</b> users</p>
                        <p className='profileSubText'>Followed by {userInfo.totalfollowers} <b>Ascents</b> users</p>
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'><b>Ascents</b> user since</p>
                        <p className='profileSubText'>{createdOn}</p>  
                    </div>
                    <div className='profileInfoSubBox'>
                        <p className='profileText'>Last seen</p>
                        <p className='profileSubText'>{lastSignIn} ago</p>
                    </div>
                </div>
                <div className='profileNav'>
                    <button onClick={seeProfileinfo} className='profileButton'>Profile Info</button>
                    <button onClick={seeRoutesLogged} className='profileButton'>Routes Logged</button>
                    <button onClick={seeBouldersLogged} className='profileButton'>Boulders Logged</button>
                    <div className='activeToggle'>To-Do's</div>
                    <button onClick={seeFollowing} className='profileButton'>Following/Followers</button>
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