import React, { useEffect, useState } from 'react';
import { fetchAllUsers, auth, getUserInfoByEmail } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const RecentAscents = () => {
    let navigate = useNavigate();

    const [user, loading, error] = useAuthState(auth);

    const [friendsOnly, setFriendsOnly] = useState(false);

    const [usersAscents, setUsersAscents] = useState([]);
    const [recentAscents, setRecentAscents] = useState([]);

    const [recentFriendsAscents, setRecentFriendsAscents] = useState([]);

    useEffect(() => {
        const alluserdataarray = [];
        const allusersdata = fetchAllUsers();
        allusersdata.then((resolveddata) => {
            const usersdata = resolveddata;
            usersdata.map((user) => {
                alluserdataarray.push(...user.logbook);
            });
            setUsersAscents(alluserdataarray);
        })
    }, [user])

    useEffect(() => {
        const sortedAscentsByDate = usersAscents.sort((ascent1 ,ascent2) => {
            return new Date(ascent2.date) - new Date(ascent1.date);
        });
        setRecentAscents(sortedAscentsByDate);
    }, [usersAscents])

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
                    {recentFriendsAscents.map((ascent, index) => {
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