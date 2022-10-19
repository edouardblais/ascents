import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import AddAscentModal from '../../addascent/AddAscentModal';
import { updateToDoList } from '../../firebase/Firebase';
import '../Profile.css';


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
            <h1>To Do list</h1>
            <div>
                {userToDos.map((climb, index) => {
                    return  <div key={index}>
                                <p onClick={() => seeClimb(climb)}>{climb.climb}</p>
                                <button onClick={() => showAddAscentModal(climb)}>+Tick!</button>
                                <button onClick={() => removeFromToDo(climb)}>Remove</button>
                                {displayModal===climb? <AddAscentModal climb={climb} useremail={userInfo.email}/> : null}
                            </div>
                })}
            </div>
        </div>
    )
}

export default ToDo;