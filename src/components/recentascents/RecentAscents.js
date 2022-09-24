import React, { useEffect, useState } from 'react';
import { fetchAllUsers, auth, getUserInfoByEmail, fetchFollowingUsers } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const RecentAscents = () => {
    let navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);

    const [friendsOnly, setFriendsOnly] = useState(false);

    const [usersAscents, setUsersAscents] = useState([]);
    const [recentAscents, setRecentAscents] = useState([]);

    const [userInfo, setUserInfo] = useState(null);
    const [followedInfo, setFollowedInfo] = useState([]);
    const [followingAscents, setFollowingAscents] = useState([]);
    const [recentFollowingAscents, setRecentFollowingAscents] = useState([]);

    useEffect(() => {
        const alluserdataarray = [];
        const allusersdata = fetchAllUsers();
        allusersdata.then((resolveddata) => {
            const usersdata = resolveddata;
            usersdata.map((eachuser) => {
                alluserdataarray.push(...eachuser.logbook);
            });
            setUsersAscents(alluserdataarray);
        })
    }, [])

    useEffect(() => {
        const sortedAscentsByDate = usersAscents.sort((ascent1 ,ascent2) => {
            return new Date(ascent2.date) - new Date(ascent1.date);
        });
        setRecentAscents(sortedAscentsByDate);
    }, [usersAscents])

    useEffect(() => {
        if (user) {
            const userInfo = getUserInfoByEmail(user.email);
            userInfo.then((resolvedInfo) => {
                const resolveduserinfo = resolvedInfo[0];
                setUserInfo(resolveduserinfo);
                });
        }
    }, [user])

    useEffect(() => {
        if (user) {
            const followedUserInfo = fetchFollowingUsers(userInfo.following);
            setFollowedInfo(followedUserInfo);
        }
    }, [userInfo])

    useEffect(() => {
        if (user) {
            followedInfo.forEach((followeduser) => {
                setFollowingAscents((prevState) => [...prevState, ...followeduser.logbook])
            })
        }
    }, [followedInfo])

    useEffect(() => {
        if (user) {
            const sortedFollowingAscentsByDate = followingAscents.sort((ascent1 ,ascent2) => {
                return new Date(ascent2.date) - new Date(ascent1.date);
            });
            setRecentFollowingAscents(sortedFollowingAscentsByDate);
        }   
    }, [followingAscents])

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
                                    <div>{ascent.climb} {ascent.date}</div> 
                                    <button onClick={() => seeProfile(ascent.email)}>{ascent.name}</button>
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
                                <div>{ascent.climb} {ascent.date}</div> 
                                <button onClick={() => seeProfile(ascent.email)}>{ascent.name}</button>
                            </div>
                })}
            </div>
        </div>
    )
}

export default RecentAscents;