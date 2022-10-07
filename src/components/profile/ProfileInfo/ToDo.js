import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";


const ToDo = () => {
    const location = useLocation();
    const userInfo = location.state;

    const navigate = useNavigate();

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
                {userInfo.todolist.map((climb, index) => {
                    return <div key={index} onClick={() => seeClimb(climb)}>{climb.climb}</div>
                })}
            </div>
        </div>
    )
}

export default ToDo;