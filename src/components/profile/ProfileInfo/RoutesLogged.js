import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updateLogbook } from '../../firebase/Firebase';
import '../Profile.css';


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
        <div className='profileContent'>
            <h1>Routes logged</h1>
            <div>
                {routesLogged.map((climb, index) => {
                    if (climb.type === 'Sport Climbing' || climb.type === 'Trad Climbing') {
                        return  <div key={index} className='searchResult'>
                                    <div className='searchResultSubPart' onClick={() => seeClimb(climb)}>
                                        <div className='searchResultMainInfo'>{climb.climb}</div>
                                        <div className='searchResultSecInfo'>{climb.crag} - {climb.area} - {climb.country}</div>
                                    </div>
                                    <div className='searchResultSubPart'>
                                        <div className='searchResultMainInfo'>{climb.grade}</div>
                                        <div className='searchResultSecInfo'>{climb.type}</div>
                                    </div>
                                    <div className='searchResultSubPart'>
                                        <div className='searchResultMainInfo'>{climb.grade}</div>
                                        <div className='searchResultSecInfo'>{climb.feel}</div>
                                    </div>
                                    <div className='searchResultSubPart'>
                                        <div className='searchResultMainInfo'>{climb.rating} stars</div>
                                        <div className='searchResultSecInfo'>{climb.recommendation}</div>
                                    </div>
                                    <div className='searchResultSubPart'>
                                        <div className='searchResultMainInfo'>{climb.comment}</div>
                                    </div>
                                    <div className='searchResultSubPart'>
                                        <div className='searchResultMainInfo'>{climb.type}</div>
                                        <div className='searchResultSecInfo'>{climb.rp}</div>
                                    </div>
                                    <div className='searchResultSubPart'>
                                        <button onClick={() => removeFromLogbook(climb)}>Delete</button>
                                    </div>
                                </div>
                    }
                })}
            </div>
        </div>
    )
}

export default RoutesLogged;