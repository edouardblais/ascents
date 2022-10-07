import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { updateLogbook } from '../../firebase/Firebase'

const BouldersLogged = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = location.state;

    const [bouldersLogged, setBouldersLogged] = useState(userInfo.logbook);

    const seeClimb = (climb) => {
        navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
            state: {
                chosenClimb:climb
            }
        }) 
    }

    const removeFromLogbook = (climb) => {
        const newLogbook = bouldersLogged.filter((rockclimb) => (rockclimb !== climb));
        setBouldersLogged([...newLogbook]);
        updateLogbook(newLogbook, userInfo.email);
    }

    return (
        <div>
            <h1>Boulders logged</h1>
            <div>
                {bouldersLogged.map((climb, index) => {
                    if (climb.type === 'Bouldering') {
                        return  <div>
                                  <p key={index} onClick={() => seeClimb(climb)}>{climb.climb}</p>
                                  <button onClick={() => removeFromLogbook(climb)}>Remove</button>
                                </div>
                    }
                })}
            </div>
        </div>
    )
}

export default BouldersLogged;