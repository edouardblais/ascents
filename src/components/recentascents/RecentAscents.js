import React, { useEffect, useState } from 'react';
import { fetchAllUsers, auth } from '../firebase/Firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const RecentAscents = () => {
    const [user, loading, error] = useAuthState(auth);

    const [friendsOnly, setFriendsOnly] = useState(false);

    const [usersAscents, setUsersAscents] = useState([]);
    const [recentAscents, setRecentAscents] = useState([]);

    const [recentFriendsAscents, setRecentFriendsAscents] = useState([]);

    useEffect(() => {
        const allusersdata = fetchAllUsers();
        allusersdata.then((resolveddata) => {
            const usersdata = resolveddata;
            usersdata.map((user) => {
                setUsersAscents((prevstate) => 
                    [...prevstate, ...user.logbook])
            })
        })
    }, [])

    useEffect(() => {
        const today = new Date();
        const filteredAscents = usersAscents.filter((ascent) => (ascent.date === today));
        setRecentAscents(filteredAscents);
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
                    {recentFriendsAscents.map((ascent) => {
                        return <div>{ascent.climb} {ascent.name}</div>
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
                {recentAscents.map((ascent) => {
                    return <div>{ascent.climb} {ascent.name}</div>
                })}
            </div>
        </div>
    )
}

export default RecentAscents;