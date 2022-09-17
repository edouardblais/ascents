import React from 'react';
import { useLocation } from "react-router-dom";


const RoutesLogged = () => {
    const location = useLocation();
    const userInfo = location.state;

    return (
        <div>
            <h1>Routes logged</h1>
            <div>
                {userInfo.logbook.map((climb, index) => {
                    if (climb.type === 'Sport Climbing' || climb.type === 'Trad Climbing') {
                        return <div key={index}>{climb.climb}</div>
                    }
                })}
            </div>
        </div>
    )
}

export default RoutesLogged;