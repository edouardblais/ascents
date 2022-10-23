import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AddAscentModal from '../../addascent/AddAscentModal';
import { updateToDoList } from '../../firebase/Firebase';
import '../Profile.css';
import './Logbook.css';


const ToDo = ({userInfo}) => {
    const navigate = useNavigate();

    const [userToDos, setUserToDos] = useState(userInfo.todolist);
    const [displayModal, setDisplayModal] = useState(null);

    const showAddAscentModal = (chosenClimb) => {
            setDisplayModal(chosenClimb)
    };

    const removeFromToDo = (climb) => {
        const newToDos = userToDos.filter((rockclimb) => (rockclimb !== climb));
        setUserToDos([...newToDos]);
        updateToDoList(newToDos, userInfo.email);
    }

    const seeClimb = (climb) => {
            navigate('/SearchAreas/SearchCrags/SearchClimbs/Climb', {
                state: {
                    chosenClimb:climb
                }
            }) 
    }

    return (
        <div className='profileContent'>
            <div className='logbookBox'>
                {userToDos.map((climb, index) => {
                    return  <div key={index} className='loggedClimbBox'>
                                <div className='loggedClimbInfoBox' onClick={() => seeClimb(climb)}>
                                    <div className='loggedClimbTopInfo'>{climb.climb}</div>
                                    <div className='loggedClimbBottomInfo'>{climb.crag} - {climb.area} - {climb.country}</div>
                                </div>
                                <div className='loggedClimbSubBox'>
                                    <div className='loggedClimbTopInfo'>{climb.grade} <span className='loggedClimbBottomInfo'>{climb.feel}</span></div>
                                    <div className='loggedClimbBottomInfo'>{climb.type}</div>
                                </div>
                                
                                <div className='loggedClimbSubBox'>
                                    <div className='loggedClimbTopInfo'>{climb.averagerating} stars</div>
                                    <div className='loggedClimbBottomInfo'>{climb.numberoflogs} ascents</div>
                                </div>
                                <div className='toDoButtonBox'>
                                    <button onClick={() => showAddAscentModal(climb)}>Tick it!</button>
                                    <button onClick={() => removeFromToDo(climb)} className='deleteButton'><span className="material-symbols-outlined">delete</span></button>
                                </div>
                                {displayModal===climb? <AddAscentModal climb={climb} useremail={userInfo.email}/> : null}
                            </div>
                })}
            </div>
        </div>
    )
}

export default ToDo;