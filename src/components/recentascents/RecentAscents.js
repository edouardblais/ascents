import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../firebase/Firebase';

const RecentAscents = () => {
    const [usersAscents, setUsersAscents] = useState([]);
    const [recentAscents, setRecentAscents] = useState([]);

    useEffect(() => {
        const allusersdata = fetchAllUsers();
        allusersdata.then((resolveddata) => {
            const usersdata = resolveddata;
            usersdata.map((user) => {
                setUsersAscents((prevstate) => 
                    [...prevstate, [...user.logbook]])
            })
        })
    }, [])

    useEffect(() => {
        const today = new Date();
        const filteredAscents = usersAscents.filter((ascent) => (ascent.date === today));
        setRecentAscents(filteredAscents);
    }, [usersAscents])

    return (
        <div>
            <h1>Recent Ascents</h1>
            <div>
                {recentAscents.map((ascent) => {
                    return <div>{ascent.climb} {ascent.name}</div>
                })}
            </div>
        </div>
    )
}

export default RecentAscents;