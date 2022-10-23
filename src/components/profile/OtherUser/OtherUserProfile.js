import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { auth, addToFollowing, addToFollower, getUserInfo, removeFromFollowers, removeFromFollowing } from '../../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import format from 'date-fns/format';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { shuffleArray } from '../../operations/Operations';
import RoutesLogged from '../ProfileInfo/RoutesLogged';
import BouldersLogged from '../ProfileInfo/BouldersLogged';
import Following from '../ProfileInfo/Following';
import ToDo from '../ProfileInfo/ToDo';
import '../Profile.css';

const OtherUserProfile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const otherUser = location.state.otherUserInfo;

    const [user, loading, error] = useAuthState(auth);
    const [userInfo, setUserInfo] = useState('');

    const [followed, setFollowed] = useState(false);

    const [displayInfo, setDisplayInfo] = useState(true);
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
        setNumberOfAscents(otherUser.logbook.length);
        setNumberOfToDos(otherUser.todolist.length);

        const recommendedArray = otherUser.logbook.filter((climb) => (climb.recommendation === true));
        const shuffledRecommendations = shuffleArray(recommendedArray);
        setRecommendedClimbs(shuffledRecommendations);
    }, [])

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
        if (userInfo.following) {
            userInfo.following.forEach((followed) => {
                if (followed.email === otherUser.email) {
                    setFollowed(true)
                }
            })
        }
    }, [userInfo])

    const followUser = () => {
        if (user) {
            addToFollowing(userInfo, otherUser);
            addToFollower(userInfo, otherUser);
            setFollowed(true)
            alert(`You are now following ${otherUser.name}!`)
        } else {
            alert('Please sign in or register to follow climbers!')
        }
    }

    const unfollowUser = () => {
        const newFollowingArray = userInfo.following.filter((otherusername) => (otherusername !== otherUser.name));
        const newFollowersArray = otherUser.followers.filter((otherusername) => (otherusername !== userInfo.name));
        removeFromFollowing(userInfo, otherUser, newFollowingArray);
        removeFromFollowers(userInfo, otherUser, newFollowersArray);
        setFollowed(false);
        alert(`You have unfollowed ${otherUser.name}!`)
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

    if (displayRoutesLogged) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <div className='profileInfoSubBox'>
                        <h3 className='profileName'>{otherUser.name}</h3>
                        <p className='profileSubText'>{otherUser.otherInfo.age} years old</p>
                        <p className='profileSubText'>{otherUser.otherInfo.country}</p>
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
                        <h3 className='profileName'>{otherUser.name}</h3>
                        <p className='profileSubText'>{otherUser.otherinfo.age} years old</p>
                        <p className='profileSubText'>{otherUser.otherinfo.country}</p>
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
                        <h3 className='profileName'>{otherUser.name}</h3>
                        <p className='profileSubText'>{otherUser.otherinfo.age} years old</p>
                        <p className='profileSubText'>{otherUser.otherinfo.country}</p>
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
                        <h3 className='profileName'>{otherUser.name}</h3>
                        <p className='profileSubText'>{otherUser.otherinfo.age} years old</p>
                        <p className='profileSubText'>{otherUser.otherinfo.country}</p>
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

    if (displayInfo) {
        return (
            <div className='profileBox'>
                <div className='profileInfoBox'>
                    <div className='profileInfoSubBox'>
                        <h3 className='profileName'>{otherUser.name}</h3>
                        <p className='profileSubText'>{otherUser.otherinfo.age} years old</p>
                        <p className='profileSubText'>{otherUser.otherinfo.country}</p>
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
                                <p>Name: <b>{otherUser.name}</b></p>
                                <p>From: <b>{otherUser.otherinfo.country}</b></p>
                                <p>Age: <b>{otherUser.otherinfo.age}</b></p>
                            </div>
                            <div className='contentInfoSubSubBox'>
                                <p>Started climbing in: <b>{otherUser.otherinfo.startedClimbing}</b></p>
                                <p>Favorite areas: <b>{otherUser.otherinfo.favoriteAreas}</b></p>
                                <p>Other interests: <b>{otherUser.otherinfo.otherInterests}</b></p>
                            </div>
                            <button type='button' className='profileEditButton' onClick={followed?() => unfollowUser(): () => followUser()}><span className="material-symbols-outlined">settings</span></button>
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
}

export default OtherUserProfile;