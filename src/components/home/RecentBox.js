import React, { useEffect, useState } from 'react';
import { fetchAllUsers, auth, getUserInfoByEmail, fetchFollowingUsers, fetchExactClimb } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import './RecentBox.css'

const RecentBox = () => {
    let navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);

    const [recentAscents, setRecentAscents] = useState([]);
    const [recentFollowingAscents, setRecentFollowingAscents] = useState([]);

    let counter = 0;
    let friendsCounter = 0;

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
            counter = 0;
            friendsCounter = 0;
            getUserInfoByEmail(user.email)
                .then((resolvedInfo) => {
                    return fetchFollowingUsers(resolvedInfo[0].following);
                })
                .then((resolvedInfo)=> {
                    const followingAscents = [];
                    for (let followeduser of resolvedInfo) {
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

    if (user) {
        return (
            <div className="recentBox">
                <h3 className='recentBoxTitle'>Recent Ascents</h3>
                <h4 className='recentBoxSubTitle'>Friends</h4>
                <div className="recentascentsbox">
                    {recentFollowingAscents.map((ascent, index) => {
                        friendsCounter += 1;
                        if (friendsCounter <= 5 && friendsCounter !== 0) {
                            return  <div key={index} className="recentascent">
                                        <div onClick={() => seeClimb(ascent)} className="recentclimb">{ascent.climb}-{ascent.grade}</div> 
                                        <div onClick={() => seeProfile(ascent.email)} className="recentuser">{ascent.name}</div>
                                    </div>
                        }
                        if (friendsCounter === 0) {
                            return <p>No recent ascents by friends</p>
                        }
                    })}                    
                </div>
                <h4 className='recentBoxSubTitle'>Global</h4>
                <div className="recentascentsbox">
                {recentAscents.map((ascent, index) => {
                    counter += 1;
                    if (counter <= 5) {
                        return  <div key={index}  className="recentascent">
                                    <div onClick={() => seeClimb(ascent)} className="recentclimb">{ascent.climb}-{ascent.grade}</div> 
                                    <div onClick={() => seeProfile(ascent.email)} className="recentuser">{ascent.name}</div>
                                </div>
                    }
                })}
            </div>
            </div>
        )
    }
    
    return (
        <div className="recentBox">
            <h3 className='recentBoxTitle'>Recent Ascents</h3>
            <div className="recentascentsbox">
                {recentAscents.map((ascent, index) => {
                    counter += 1;
                    if (counter <= 5) {
                        return  <div key={index}  className="recentascent">
                                    <div onClick={() => seeClimb(ascent)} className="recentclimb">{ascent.climb} {ascent.date}</div> 
                                    <div onClick={() => seeProfile(ascent.email)} className="recentuser">{ascent.name}</div>
                                </div>
                     }
                })}
            </div>
        </div>
    )
}

export default RecentBox;