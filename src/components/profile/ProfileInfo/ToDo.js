import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { AddAscentModal } from '../../addascent/AddAscentModal';
import { updateToDoList } from '../../firebase/Firebase'


const ToDo = () => {
    const location = useLocation();
    const userInfo = location.state;

    const navigate = useNavigate();

    const [userToDos, setUserToDos] = useState(userInfo.todolist)
    const [displayModal, setDisplayModal] = useState(false)

    const showAddAscentModal = () => {
            setDisplayModal(true)
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
        <div>
            <h1>To Do list</h1>
            <div>
                {userToDos.map((climb, index) => {
                    return  <div key={index}>
                                <p onClick={() => seeClimb(climb)}>{climb.climb}</p>
                                <button onClick={showAddAscentModal}>+Tick!</button>
                                <button onClick={() => removeFromToDo(climb)}>Remove</button>
                                {displayModal? <AddAscentModal climb={climb} useremail={userInfo.email}/> : null}
                            </div>
                })}
            </div>
        </div>
    )
}

export default ToDo;