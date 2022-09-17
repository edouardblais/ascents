import React from 'react';
import { useLocation } from "react-router-dom";

const BouldersLogged = () => {
    const location = useLocation();
    const userInfo = location.state;

    return (
        <div>
            <h1>Boulders logged</h1>
            <div>
                {userInfo.logbook.map((climb, index) => {
                    if (climb.type === 'Bouldering') {
                        return <div key={index}>{climb.climb}</div>
                    }
                })}
            </div>
        </div>
    )
}

export default BouldersLogged;