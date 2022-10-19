import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updateLogbook } from '../../firebase/Firebase'


const RoutesLogged = ({userInfo}) => {
    const navigate = useNavigate();


    const [routesLogged, setRoutesLogged] = useState(userInfo.logbook);

    const seeClimb = (climb) => {
        navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
            state: {
                chosenClimb:climb
            }
        }) 
    }

    const removeFromLogbook = (climb) => {
        const newLogbook = routesLogged.filter((rockclimb) => (rockclimb !== climb));
        setRoutesLogged([...newLogbook]);
        updateLogbook(newLogbook, userInfo.email);
    }

    return (
        <div>
            <h1>Routes logged</h1>
            <div>
                {routesLogged.map((climb, index) => {
                    if (climb.type === 'Sport Climbing' || climb.type === 'Trad Climbing') {
                        return  <div key={index}>
                                  <p onClick={() => seeClimb(climb)}>{climb.climb}</p>
                                  <button onClick={() => removeFromLogbook(climb)}>Remove</button>
                                </div>
                    }
                })}
            </div>
        </div>
    )
}

export default RoutesLogged;