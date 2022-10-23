import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { updateLogbook } from '../../firebase/Firebase';
import '../Profile.css';
import './Logbook.css';

const BouldersLogged = ({userInfo}) => {
    const navigate = useNavigate();

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
        <div className='profileContent'>
            <div className='logbookBox'>
                {bouldersLogged.map((climb, index) => {
                    if (climb.type === 'Bouldering') {
                        return  <div key={index} className='loggedClimbBox'>
                                    <div>
                                        <span className={climb.rp==='onsight'? 'onsight material-symbols-outlined' : climb.rp === 'flash'? 'flash material-symbols-outlined' : 'material-symbols-outlined redpoint'}>adjust</span>
                                    </div>
                                    <div className='loggedClimbInfoBox' onClick={() => seeClimb(climb)}>
                                        <div className='loggedClimbTopInfo'>{climb.climb}</div>
                                        <div className='loggedClimbBottomInfo'>{climb.crag} - {climb.area} - {climb.country}</div>
                                    </div>
                                    <div className='loggedClimbCommentBox'>
                                        <div  className='loggedClimbTopInfo'>{climb.comment}</div>
                                    </div>
                                    <div className='loggedClimbSubBox'>
                                        <div className='loggedClimbTopInfo'>{climb.grade} <span className='loggedClimbBottomInfo'>{climb.feel}</span></div>
                                        <div className='loggedClimbBottomInfo'>{climb.type}</div>
                                    </div>
                                    
                                    <div className='loggedClimbSubBox'>
                                        <div className='loggedClimbTopInfo'>{climb.rating} stars</div>
                                        <div className='loggedClimbBottomInfo'>{climb.recommendation? <span className="material-symbols-outlined redpoint">favorite</span>:''}</div>
                                    </div>
                                    <div className='loggedClimbSubBox'>
                                        <button onClick={() => removeFromLogbook(climb)} className='deleteButton'><span className="material-symbols-outlined">delete</span></button>
                                    </div>
                                </div>
                    }
                })}
            </div>
        </div>
    )
}

export default BouldersLogged;