import React, { useEffect, useState } from 'react';
import { fetchAllUsers, auth, getUserInfoByEmail, fetchFollowingUsers, fetchExactClimb } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

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
                    console.log(resolvedUsers)
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

    if (friendsOnly === true) {
        return (
            <div>
                <h1>Recent Ascents</h1>
                <button onClick={seeAllAscents}>See All Climbers</button>
                <div>
                    {recentFollowingAscents.map((ascent, index) => {
                        return  <div key={index}>
                                    <div onClick={() => seeClimb(ascent)}>{ascent.climb} {ascent.date}</div> 
                                    <div onClick={() => seeProfile(ascent.email)}>{ascent.name}</div>
                                </div>
                    })}
                </div>
            </div>
        )
    }
    
    return (
        <div>
            <h1>Recent Ascents</h1>
            <button onClick={seeFollowedAscents}>See Followed Climbers Only</button>
            <div>
                {recentAscents.map((ascent, index) => {
                    return  <div key={index}>
                                <div onClick={() => seeClimb(ascent)}>{ascent.climb} {ascent.date}</div> 
                                <div onClick={() => seeProfile(ascent.email)}>{ascent.name}</div>
                            </div>
                })}
            </div>
        </div>
    )
}

export default RecentAscents;