import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const BouldersLogged = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = location.state;

    const seeClimb = (climb) => {
        navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
            state: {
                chosenClimb:climb
            }
        }) 
    }

    return (
        <div>
            <h1>Boulders logged</h1>
            <div>
                {userInfo.logbook.map((climb, index) => {
                    if (climb.type === 'Bouldering') {
                        return <div key={index} onClick={() => seeClimb(climb)}>{climb.climb}</div>
                    }
                })}
            </div>
        </div>
    )
}

export default BouldersLogged;