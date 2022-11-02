import React, { useEffect, useState } from 'react';
import { fetchAllUsers, auth, getUserInfoByEmail, fetchFollowingUsers, fetchExactClimb } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './RecentAscents.css';
import '../profile/ProfileInfo/Following.css';
import '../profile/ProfileInfo/Logbook.css';

const RecentAscents = () => {
    let navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);

    const [friendsOnly, setFriendsOnly] = useState(false);

    const [recentAscents, setRecentAscents] = useState([]);
    const [recentFollowingAscents, setRecentFollowingAscents] = useState([]);

    useEffect(() => {
        const alluserdataarray = [];
        const allusersdata = fetchAllUsers();
        allusersdata.then((resolveddata) => {
            const usersdata = resolveddata;
            usersdata.map((eachuser) => {
                alluserdataarray.push(...eachuser.logbook);
            });
            const sortedAscentsByDate = alluserdataarray.sort((ascent1 ,ascent2) => {
                return new Date(ascent2.date) - new Date(ascent1.date);
            });
            setRecentAscents(sortedAscentsByDate);
        })
    }, [])

    useEffect(() => {
        if (user) {
            getUserInfoByEmail(user.email)
                .then((resolvedInfo) => {
                    return fetchFollowingUsers(resolvedInfo[0].following);
                })
                .then((resolvedUsers)=> {
                    const followingAscents = [];
                    for (let followeduser of resolvedUsers) {
                        followingAscents.push(...followeduser.logbook)
                    }
                    const sortedFollowingAscentsByDate = followingAscents.sort((ascent1 ,ascent2) => {
                        return new Date(ascent2.date) - new Date(ascent1.date);
                    });
                    setRecentFollowingAscents(sortedFollowingAscentsByDate);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [user])

    const seeFollowedAscents = () => {
        if (user) {
            setFriendsOnly(true);
        } else {
            alert('Please sign in or register to follow climbers!')
        }
    }

    const seeAllAscents = () => {
        setFriendsOnly(false);
    }

    const seeClimb = (climb) => {
        const climbinfoarray = fetchExactClimb(climb.climb);
        climbinfoarray.then((resolvedClimbInfo) => {
            const climbinfo = resolvedClimbInfo[0];
            navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                state: {
                    chosenClimb:climbinfo
                }
            }) 
        }) 
    }

    const seeProfile = (email) => {
        const user = getUserInfoByEmail(email);
        user.then((resolvedUser) => {
            const userinfo = resolvedUser[0];
            navigate('/visitUser', {
                state: {
                    otherUserInfo: userinfo,
                }
            })
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

    if (friendsOnly) {
        return (
            <div className='recentAscentsBox'>
                <h1 className='recentAscentsTitle'>Recent Ascents</h1>
                <div className='followingNav'>
                    <p onClick={seeAllAscents} className='followingNavChoiceActive'>All Ascents</p>
                    <p className='followingNavChoiceInactive'>Friends Ascents</p>
                </div>
                <div className='recentAscentsSubBox'>
                    {recentFollowingAscents.map((climb, index) => {
                        return  <div key={index} className='recentAscentBox'>
                                    <div className='loggedClimbNameBox'>
                                        <div className='loggedClimbTopInfo' onClick={() => seeProfile(climb.email)}>{climb.name}</div>
                                    </div>
                                    <div>
                                        <span className={climb.rp==='onsight'? 'onsight material-symbols-outlined' : climb.rp === 'flash'? 'flash material-symbols-outlined' : 'material-symbols-outlined redpoint'}>adjust</span>
                                    </div>
                                    <div className='loggedClimbInfoBox' onClick={() => seeClimb(climb)}>
                                        <div className='loggedClimbTopInfo'>{climb.climb}</div>
                                        <div className='loggedClimbBottomInfo'>{climb.crag} - {climb.area} - {climb.country}</div>
                                    </div>
                                    <div className='loggedClimbCommentBox'>
                                        <div  className='loggedClimbTopInfo'>{climb.comment}</div>
                                    </div>
                                    <div className='loggedClimbSubBox'>
                                        <div className='loggedClimbTopInfo'>{climb.grade} <span className='loggedClimbBottomInfo'>{climb.feel}</span></div>
                                        <div className='loggedClimbBottomInfo'>{climb.type}</div>
                                    </div>
                                    <div className='loggedClimbSubBox'>
                                        <div className='loggedClimbTopInfo'>{climb.rating} stars</div>
                                        <div className='loggedClimbBottomInfo'>{climb.recommendation? <span className="material-symbols-outlined redpoint">favorite</span>:''}</div>
                                    </div>
                                    <div className='loggedClimbSubBox'>
                                        <div className='loggedClimbTopInfo'>{climb.date}</div>
                                    </div>
                                </div>
                    })}
                </div>
            </div>
        )
    }
    
    return (
        <div className='recentAscentsBox'>
            <h1 className='recentAscentsTitle'>Recent Ascents</h1>
            <div className='followingNav'>
                <p className='followingNavChoiceInactive'>All Ascents</p>
                <p className='followingNavChoiceActive' onClick={seeFollowedAscents}>Friends Ascents</p>
            </div>
            <div className='recentAscentsSubBox'>
                {recentAscents.map((climb, index) => {
                    return  <div key={index} className='recentAscentBox'>
                                <div className='loggedClimbNameBox'>
                                    <div className='loggedClimbTopInfo' onClick={() => seeProfile(climb.email)}>{climb.name}</div>
                                </div>
                                <div>
                                    <span className={climb.rp==='onsight'? 'onsight material-symbols-outlined' : climb.rp === 'flash'? 'flash material-symbols-outlined' : 'material-symbols-outlined redpoint'}>adjust</span>
                                </div>
                                <div className='loggedClimbInfoBox' onClick={() => seeClimb(climb)}>
                                    <div className='loggedClimbTopInfo'>{climb.climb}</div>
                                    <div className='loggedClimbBottomInfo'>{climb.crag} - {climb.area} - {climb.country}</div>
                                </div>
                                <div className='loggedClimbCommentBox'>
                                    <div  className='loggedClimbTopInfo'>{climb.comment}</div>
                                </div>
                                <div className='loggedClimbSubBox'>
                                    <div className='loggedClimbTopInfo'>{climb.grade} <span className='loggedClimbBottomInfo'>{climb.feel}</span></div>
                                    <div className='loggedClimbBottomInfo'>{climb.type}</div>
                                </div>
                                
                                <div className='loggedClimbSubBox'>
                                    <div className='loggedClimbTopInfo'>{climb.rating} stars</div>
                                    <div className='loggedClimbBottomInfo'>{climb.recommendation? <span className="material-symbols-outlined redpoint">favorite</span>:''}</div>
                                </div>
                                <div className='loggedClimbSubBox'>
                                    <div className='loggedClimbTopInfo'>{climb.date}</div>
                                </div>
                            </div>
                })}
            </div>
        </div>
    )
}

export default RecentAscents;