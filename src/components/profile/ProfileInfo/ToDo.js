import React from 'react';
import { useLocation } from "react-router-dom";


const ToDo = () => {
    const location = useLocation();
    const userInfo = location.state;

    return (
        <div>
            <h1>To Do list</h1>
            <div>
                {userInfo.todolist.map((climb, index) => {
                    return <div key={index}>{climb.climb}</div>
                })}
            </div>
        </div>
    )
}

export default ToDo;